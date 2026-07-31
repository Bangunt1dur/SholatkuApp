<?php
// ============================================================
// api.php - Backend SholatKu App
// Upload file ini ke: public_html/api.php
// ============================================================

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ============================================================
// KONFIGURASI DATABASE - SESUAIKAN DENGAN DATA cPANEL ANDA
// ============================================================
$DB_HOST = "localhost";
$DB_NAME = "sholatku_App";      // Nama database di cPanel (sesuai phpMyAdmin)
$DB_USER = "sholatku_user";     // Username database di cPanel
$DB_PASS = "password_anda";     // Password database di cPanel
// ============================================================

// Koneksi ke MySQL
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Koneksi database gagal: " . $conn->connect_error]);
    exit();
}

// Baca action dari request
$action = $_GET['action'] ?? $_POST['action'] ?? '';
$input = json_decode(file_get_contents("php://input"), true) ?? [];

// ─── ROUTER ───────────────────────────────────────────────────
switch ($action) {

    // ── REGISTER ──────────────────────────────────────────────
    case 'register':
        $name     = $conn->real_escape_string($input['name'] ?? '');
        $email    = $conn->real_escape_string($input['email'] ?? '');
        $password = password_hash($input['password'] ?? '', PASSWORD_BCRYPT);
        $pin      = $conn->real_escape_string($input['pin'] ?? '1234');
        $role     = $conn->real_escape_string($input['role'] ?? 'anak');

        if (!$name || !$email || !$input['password']) {
            echo json_encode(["success" => false, "message" => "Data tidak lengkap!"]);
            break;
        }

        // Cek apakah email sudah terdaftar
        $check = $conn->query("SELECT id FROM users WHERE email = '$email'");
        if ($check->num_rows > 0) {
            echo json_encode(["success" => false, "message" => "Email sudah terdaftar!"]);
            break;
        }

        $sql = "INSERT INTO users (name, email, password, pin, role) VALUES ('$name', '$email', '$password', '$pin', '$role')";
        if ($conn->query($sql)) {
            $user_id = $conn->insert_id;
            // Buat profil default untuk user baru
            $conn->query("INSERT INTO profiles (user_id) VALUES ($user_id)");
            echo json_encode([
                "success" => true,
                "message" => "Registrasi berhasil!",
                "user" => ["id" => $user_id, "name" => $name, "email" => $email, "role" => $role, "pin" => $input['pin'] ?? '1234']
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Registrasi gagal: " . $conn->error]);
        }
        break;

    // ── LOGIN ──────────────────────────────────────────────────
    case 'login':
        $email    = $conn->real_escape_string($input['email'] ?? '');
        $password = $input['password'] ?? '';

        if (!$email || !$password) {
            echo json_encode(["success" => false, "message" => "Email dan password wajib diisi!"]);
            break;
        }

        $result = $conn->query("SELECT * FROM users WHERE email = '$email'");
        if ($result->num_rows === 0) {
            echo json_encode(["success" => false, "message" => "Email tidak ditemukan!"]);
            break;
        }

        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // Ambil profil user
            $profile_res = $conn->query("SELECT * FROM profiles WHERE user_id = {$user['id']}");
            $profile = $profile_res->fetch_assoc() ?? [];

            echo json_encode([
                "success" => true,
                "message" => "Login berhasil!",
                "user" => [
                    "id"    => $user['id'],
                    "name"  => $user['name'],
                    "email" => $user['email'],
                    "role"  => $user['role'],
                    "pin"   => $user['pin']
                ],
                "profile" => [
                    "level"               => (int)($profile['level'] ?? 1),
                    "xp"                  => (int)($profile['xp'] ?? 0),
                    "gems"                => (int)($profile['gems'] ?? 5),
                    "stars"               => (int)($profile['stars'] ?? 0),
                    "streak"              => (int)($profile['streak'] ?? 0),
                    "totalPrayers"        => (int)($profile['total_prayers'] ?? 0),
                    "completedMovements"  => json_decode($profile['completed_movements'] ?? '[]'),
                    "earnedBadges"        => json_decode($profile['earned_badges'] ?? '[]'),
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Password salah!"]);
        }
        break;

    // ── SIMPAN TRACKER SHOLAT HARIAN ──────────────────────────
    case 'save_tracker':
        $user_id  = (int)($input['user_id'] ?? 0);
        $date     = $conn->real_escape_string($input['date'] ?? date('Y-m-d'));
        $fajr     = (int)($input['fajr'] ?? 0);
        $dhuhr    = (int)($input['dhuhr'] ?? 0);
        $asr      = (int)($input['asr'] ?? 0);
        $maghrib  = (int)($input['maghrib'] ?? 0);
        $isha     = (int)($input['isha'] ?? 0);
        $count    = $fajr + $dhuhr + $asr + $maghrib + $isha;

        if (!$user_id) {
            echo json_encode(["success" => false, "message" => "User ID tidak valid!"]);
            break;
        }

        // Insert atau update (ON DUPLICATE KEY UPDATE)
        $sql = "INSERT INTO prayer_trackers (user_id, date, fajr, dhuhr, asr, maghrib, isha, count)
                VALUES ($user_id, '$date', $fajr, $dhuhr, $asr, $maghrib, $isha, $count)
                ON DUPLICATE KEY UPDATE
                fajr=$fajr, dhuhr=$dhuhr, asr=$asr, maghrib=$maghrib, isha=$isha, count=$count";

        if ($conn->query($sql)) {
            echo json_encode(["success" => true, "message" => "Tracker berhasil disimpan!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Gagal simpan tracker: " . $conn->error]);
        }
        break;

    // ── AMBIL TRACKER SHOLAT ──────────────────────────────────
    case 'get_tracker':
        $user_id = (int)($_GET['user_id'] ?? 0);
        $date    = $conn->real_escape_string($_GET['date'] ?? date('Y-m-d'));

        if (!$user_id) {
            echo json_encode(["success" => false, "message" => "User ID tidak valid!"]);
            break;
        }

        $result = $conn->query("SELECT * FROM prayer_trackers WHERE user_id = $user_id AND date = '$date'");
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo json_encode([
                "success" => true,
                "tracker" => [
                    "date"    => $row['date'],
                    "fajr"    => (bool)$row['fajr'],
                    "dhuhr"   => (bool)$row['dhuhr'],
                    "asr"     => (bool)$row['asr'],
                    "maghrib" => (bool)$row['maghrib'],
                    "isha"    => (bool)$row['isha'],
                ]
            ]);
        } else {
            echo json_encode([
                "success" => true,
                "tracker" => ["date" => $date, "fajr" => false, "dhuhr" => false, "asr" => false, "maghrib" => false, "isha" => false]
            ]);
        }
        break;

    // ── AMBIL RIWAYAT SHOLAT (STREAK HISTORY) ─────────────────
    case 'get_history':
        $user_id = (int)($_GET['user_id'] ?? 0);
        $days    = (int)($_GET['days'] ?? 90);

        if (!$user_id) {
            echo json_encode(["success" => false, "message" => "User ID tidak valid!"]);
            break;
        }

        $result = $conn->query(
            "SELECT date, count FROM prayer_trackers
             WHERE user_id = $user_id
             ORDER BY date DESC
             LIMIT $days"
        );

        $history = [];
        while ($row = $result->fetch_assoc()) {
            $history[] = ["date" => $row['date'], "count" => (int)$row['count']];
        }

        echo json_encode(["success" => true, "history" => $history]);
        break;

    // ── SIMPAN PROFIL / GAMIFIKASI ─────────────────────────────
    case 'save_profile':
        $user_id             = (int)($input['user_id'] ?? 0);
        $level               = (int)($input['level'] ?? 1);
        $xp                  = (int)($input['xp'] ?? 0);
        $gems                = (int)($input['gems'] ?? 5);
        $stars               = (int)($input['stars'] ?? 0);
        $streak              = (int)($input['streak'] ?? 0);
        $total_prayers       = (int)($input['totalPrayers'] ?? 0);
        $completed_movements = $conn->real_escape_string(json_encode($input['completedMovements'] ?? []));
        $earned_badges       = $conn->real_escape_string(json_encode($input['earnedBadges'] ?? []));

        if (!$user_id) {
            echo json_encode(["success" => false, "message" => "User ID tidak valid!"]);
            break;
        }

        $sql = "INSERT INTO profiles (user_id, level, xp, gems, stars, streak, total_prayers, completed_movements, earned_badges)
                VALUES ($user_id, $level, $xp, $gems, $stars, $streak, $total_prayers, '$completed_movements', '$earned_badges')
                ON DUPLICATE KEY UPDATE
                level=$level, xp=$xp, gems=$gems, stars=$stars, streak=$streak,
                total_prayers=$total_prayers, completed_movements='$completed_movements', earned_badges='$earned_badges'";

        if ($conn->query($sql)) {
            echo json_encode(["success" => true, "message" => "Profil berhasil disimpan!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Gagal simpan profil: " . $conn->error]);
        }
        break;

    // ── AMBIL MOVEMENT / GAMBAR SHOLAT ───────────────────────
    case 'get_movements':
        $result = $conn->query("SELECT * FROM sholat_movements ORDER BY id ASC");
        $movements = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $movements[] = [
                    "id"              => (int)$row['id'],
                    "key"             => $row['movement_key'],
                    "name"            => $row['name'],
                    "nameKids"        => $row['name_kids'],
                    "arabicText"      => $row['arabic_text'],
                    "latin"           => $row['latin'],
                    "translation"     => $row['translation'],
                    "explanation"     => $row['explanation'],
                    "explanationKids" => $row['explanation_kids'],
                    "image"           => $row['image_data'],
                    "source"          => $row['source']
                ];
            }
        }
        echo json_encode(["success" => true, "movements" => $movements]);
        break;

    // ── DEFAULT ────────────────────────────────────────────────
    default:
        echo json_encode(["success" => false, "message" => "Action tidak dikenali: '$action'"]);
        break;
}

$conn->close();
?>

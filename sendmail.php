<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/scr/Exception.php';
require 'phpmailer/scr/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet='UTF-8';
$mail->setLanguage('uk', 'phpmailer/language/');
$mail->IsHTML(true);

//від кого лист
$mail->setFrom('aleksandra.kopachovets.ne@gmail.com', 'Тест дверной мастер');
//тема листа
$mail->Subject= 'Дверной мастер. Тест'
//тіло листа
$body='<h1>ура вийшло</h1>';

if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Імя:</strong> '.$_POST['name'].'</p>;
}
if(trim(!empty($_POST['email']))){
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>;
}
if(trim(!empty($_POST['message']))){
    $body.='<p><strong>Повідомлення:</strong> '.$_POST['message'].'</p>;
}
//відправляємо форму
if(!$mail->send()){
    $message = 'Помилка';
} else {
    $message = 'Відправлено';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>
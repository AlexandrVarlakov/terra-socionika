﻿<?php
    $phone = $_POST['phone'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $msg = $_POST['message'];

    $to      = 'varlakovalexandr@mail.ru';
    $subject = 'Поступила Заявка на типирование';
    $message = 'Заявка на типирование от : ' . $name . "\r\n".'Телефон:' .$phone. "\r\n"  .'Email:' .$email. "\r\n" . 'Сообщение:' . $msg. "\r\n";
    $headers = 'From: varlakovalexandr.ru' . "\r\n" .
    'Reply-To: varlakovalexandr.ru' . "\r\n" .
    'X-Mailer: PHP/';

	mail($to, $subject, $message, $headers);
    
?>
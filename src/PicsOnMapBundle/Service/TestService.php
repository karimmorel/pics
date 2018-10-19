<?php

namespace PicsOnMapBundle\Service;

class TestService
{

protected $message;

public function __construct()
{
	$this->message = "Je vous aime.";
}

public function parler()
{
	return 'Voici le message : '.$this->getMessage();
}


public function setMessage($message)
{
	$this->message = $message;
}

public function getMessage()
{
	return $this->message;
}


}
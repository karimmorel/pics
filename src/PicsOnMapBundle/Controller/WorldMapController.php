<?php

namespace PicsOnMapBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use PicsOnMapBundle\Service\TestService;

class WorldMapController extends Controller
{
	public function indexAction(int $number, $_locale, Request $request)
	{
		// $cookie = ($request->isMethod('GET'))?$request->cookies->get('PHPSESSID'):'Ne rien afficher.'; Exemple de If raccourci

		if($request->isMethod('GET'))
		{
			$cookie = $request->cookies->get('PHPSESSID');
		}
		else
		{
			return $this->RedirectToRoute('home');
		}

		$session = $request->getSession();

		$session->set('personnage', array('prenom' => 'Joséphine', 'nom' => 'ange-gardien'));

		if($request->attributes->get('number') == 430)
		{
			$session->getFlashBag()->add('message', 'Ceci est un message de santé public.');
		}


		$paramArray = array('title' => 'Mon premier Hello World ! ', 'content' => $this->get('POM.testservice')->parler(), 'photo' => array('number' => '<strong>'.$number.'</strong>'), 'cookie' => $cookie);


		$rendu = $this->render('PicsOnMapBundle:HelloWorld:helloworld.html.twig', $paramArray);

		$mailer = $this->get('mailer');

		return $rendu;
	}
}
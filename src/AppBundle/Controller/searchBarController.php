<?php

namespace AppBundle\Controller;

use AppBundle\Entity\unpublishedPics;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class searchBarController extends Controller
{

	public function getSearchBarResultAction(Request $request)
	{
		$data = $request->request->get('form');

		$em = $this->getDoctrine()->getManager();

		$repository = $em->getRepository('AppBundle:unpublishedPics');

		$pics = $repository->searchBarRequest($data['search']);

		$countpics = $em->getRepository("AppBundle\Entity\unpublishedPics")->getPicsCount();

		$followingPicsRoute = $this->container->getParameter('pics_route');

		return $this->render('AppBundle:home:index.html.twig', array('pics' => $pics, 'search' => $data['search'], 'countpics' => $countpics, 'followingPicsRoute' => $followingPicsRoute));
	}

	public function renderSearchBarAction($search = null)
	{
		$form = $this->createFormBuilder()
		->add('search', TextType::class)
		->getForm();

		return $this->render('AppBundle:searchbar:searchbar.html.twig', array('form' => $form->createView(), 'search' => $search));
	}

}
<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {

        $nmbrPics = $this->container->getParameter('loading_pics');

        $em = $this->getDoctrine()->getManager();
        
        $published_pics = $em->getRepository("AppBundle\Entity\unpublishedPics")->findBy(array('displayPic' => 1),array('id' => 'DESC'),$nmbrPics);

        $countpics = $em->getRepository("AppBundle\Entity\unpublishedPics")->getPicsCount();

        return $this->render('AppBundle:home:index.html.twig', array('pics' => $published_pics, 'countpics' => $countpics));
    }
}

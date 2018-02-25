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

        $nmbrPics = 7;

        $em = $this->getDoctrine()->getManager();
        $published_pics = $em->getRepository("AppBundle\Entity\unpublishedPics")->findBy(array('displayPic' => 1),array('id' => 'DESC'),$nmbrPics);

        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
            'pics' => $published_pics,
        ]);
    }
}

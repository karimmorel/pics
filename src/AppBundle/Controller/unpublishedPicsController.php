<?php

namespace AppBundle\Controller;

use AppBundle\Entity\unpublishedPics;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Response;

/**
 * Unpublishedpic controller.
 *
 */
class unpublishedPicsController extends Controller
{
    /**
     * Lists all unpublishedPic entities.
     *
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $unpublishedPics = $em->getRepository('AppBundle:unpublishedPics')->findAll();

        return $this->render('unpublishedpics/index.html.twig', array(
            'unpublishedPics' => $unpublishedPics,
        ));
    }

    /**
     * Creates a new unpublishedPic entity.
     *
     */
    public function newAction(Request $request)
    {
        $unpublishedPic = new Unpublishedpics();
        $form = $this->createForm('AppBundle\Form\unpublishedPicsType', $unpublishedPic);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Récupère l'image
            $file = $unpublishedPic->getType();
            // Créer un nom pour l'image sauvegardée
            $fileName = md5(uniqid()).'.'.$file->guessExtension();
            //Défini le nouveau nom à l'objet unpublishedPic pour le sauvegarder en BDD
            $unpublishedPic->setType($fileName);
            $unpublishedPic->setCreatedAt(new \DateTime('now'));
            $unpublishedPic->setUpdatedAt(new \DateTime('now'));
            $em = $this->getDoctrine()->getManager();
            $em->persist($unpublishedPic);
            $em->flush();
            // Déplace vers le dossier qui sauvegarde les images non publiées
            $file->move(
                $this->getParameter('dossier_image_non_publiee'),
                $fileName
            );

            return $this->redirectToRoute('unpublishedpics_show', array('id' => $unpublishedPic->getId()));
        }

        return $this->render('unpublishedpics/new.html.twig', array(
            'unpublishedPic' => $unpublishedPic,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a unpublishedPic entity.
     *
     */
    public function showAction(unpublishedPics $unpublishedPic)
    {
        $deleteForm = $this->createDeleteForm($unpublishedPic);

        return $this->render('unpublishedpics/show.html.twig', array(
            'unpublishedPic' => $unpublishedPic,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing unpublishedPic entity.
     *
     */
    public function editAction(Request $request, unpublishedPics $unpublishedPic)
    {
        $pic_name = $unpublishedPic->getType();
        $unpublishedPic->setType(
            new File($this->getParameter('dossier_image_non_publiee').'/'.$pic_name)
        );
        $deleteForm = $this->createDeleteForm($unpublishedPic);
        $editForm = $this->createForm('AppBundle\Form\unpublishedPicsType', $unpublishedPic);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $unpublishedPic->setType($pic_name);
            $unpublishedPic->setUpdatedAt(new \DateTime('now'));
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('unpublishedpics_edit', array('id' => $unpublishedPic->getId()));
        }

        return $this->render('unpublishedpics/edit.html.twig', array(
            'unpublishedPic' => $unpublishedPic,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a unpublishedPic entity.
     *
     */
    public function deleteAction(Request $request, unpublishedPics $unpublishedPic)
    {
        $form = $this->createDeleteForm($unpublishedPic);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($unpublishedPic);
            $em->flush();
        }

        return $this->redirectToRoute('unpublishedpics_index');
    }

    public function movepublishedAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $undisplayed = 0;

        $ip_address = $this->container->get('request_stack')->getCurrentRequest()->getClientIp();
        $server_ip = '51.15.174.166';
        dump($ip_address);die();

        $lastUnpublished = $em->getRepository('AppBundle:unpublishedPics')->findOneBy(
           array('displayPic'=>$undisplayed),
           array('createdAt' => 'ASC')
       );

        if($lastUnpublished && $ip_address == $server_ip)
        {
            $lastUnpublished->setDisplayPic(1);
            $this->getDoctrine()->getManager()->flush();
        }

        $unpublishedPics = $em->getRepository('AppBundle:unpublishedPics')->findAll();

        return $this->render('unpublishedpics/index.html.twig', array(
            'unpublishedPics' => $unpublishedPics,
        ));
    }

    public function fiveLastPhotosAction()
    {
        $em = $this->getDoctrine()->getManager();

        $displayed = 1;


        $lastPublishedPics = $em->getRepository('AppBundle:unpublishedPics')->findBy(
           array('displayPic'=>$displayed),
           array('createdAt' => 'DESC'),
           3
       );

        $data = $this->get('jms_serializer')->serialize($lastPublishedPics, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }


    /**
     * Creates a form to delete a unpublishedPic entity.
     *
     * @param unpublishedPics $unpublishedPic The unpublishedPic entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(unpublishedPics $unpublishedPic)
    {
        return $this->createFormBuilder()
        ->setAction($this->generateUrl('unpublishedpics_delete', array('id' => $unpublishedPic->getId())))
        ->setMethod('DELETE')
        ->getForm()
        ;
    }
}

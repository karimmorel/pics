<?php

namespace AppBundle\Controller;

use AppBundle\Entity\unpublishedPics;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

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
        $unpublishedPic = new Unpublishedpic();
        $form = $this->createForm('AppBundle\Form\unpublishedPicsType', $unpublishedPic);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($unpublishedPic);
            $em->flush();

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
        $deleteForm = $this->createDeleteForm($unpublishedPic);
        $editForm = $this->createForm('AppBundle\Form\unpublishedPicsType', $unpublishedPic);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
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

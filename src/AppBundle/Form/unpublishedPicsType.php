<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class unpublishedPicsType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name')->add('shortName')->add('description')->add('shortdescription')->add('country')->add('region')->add('city')->add('theme')->add('type')->add('author')->add('subject')->add('lat')->add('lng')->add('gmapslink')->add('createdAt')->add('updatedAt')->add('picdate')->add('backgroundcolor');
    }
    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\unpublishedPics'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_unpublishedpics';
    }


}

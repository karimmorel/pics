<?php

namespace AppBundle\Repository;

/**
 * unpublishedPicsRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class unpublishedPicsRepository extends \Doctrine\ORM\EntityRepository
{

	public function searchBarRequest($word)
	{

		$qb = $this->createQueryBuilder('u');
		$nospace = str_replace(' ', '-', $word);
		$nodangerous = preg_replace('/[^A-Za-z0-9\-]/', '', $nospace);
		$words = explode('-', $nodangerous);

		$ifValid = 0;

		foreach($words as $w)
		{
			if(!empty($w))
			{
				$qb->orWhere('u.name LIKE :word'.$w)
				->orWhere('u.description LIKE :word'.$w)
				->orWhere('u.city LIKE :word'.$w)
				->orWhere('u.country LIKE :word'.$w)
				->orWhere('u.theme LIKE :word'.$w)
				->setParameter('word'.$w, '%'.$w.'%');
				$ifValid = 1;
			}
		}

		if($ifValid == null)
		{
			return null;
		}

		$query = $qb->getQuery();

		$result = $query->getResult();

		return $result;
	}


	public function getPicsCount()
	{
		return $this->createQueryBuilder('p')
		->select('COUNT(p)')
		->getQuery()
		->getSingleScalarResult();
	}


}

<?php

namespace App\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class BarberReservationCriteriaCriteria.
 *
 * @package namespace App\Criteria;
 */
class BarberReservationCriteriaCriteria implements CriteriaInterface
{
    /**
     * Apply criteria in query repository
     *
     * @param string              $model
     * @param RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        $model = $this->joinModel($model, $repository);
        return $model;
    }

    protected function joinModel($model, $repository)
    {
        return $model->join('products', 'products.id', '=', 'reservations.product_id');
    }
}

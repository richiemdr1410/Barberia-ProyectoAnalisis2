<?php

namespace App\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class ReservationCriteria.
 *
 * @package namespace App\Criteria;
 */
class ReservationCriteria implements CriteriaInterface
{
    protected $request;

    public function __construct($request)
    {
        $this->request = $request;
    }
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
        $user_id = $this->request->input('user_id');

        $model = $this->joinModel($model, $repository);
        return $model->where('user_id', $user_id);
    }

    protected function joinModel($model, $repository)
    {

        return $model->join('products', 'products.id', '=', 'reservations.product_id');


    }
}

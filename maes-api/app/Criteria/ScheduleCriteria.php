<?php

namespace App\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class ScheduleCriteria.
 *
 * @package namespace App\Criteria;
 */
class ScheduleCriteria implements CriteriaInterface
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
        $date = $this->request->input('date');
        $day_of_week = date('N', strtotime($date));

        return $model->where('day', '<>', $day_of_week);
    }
}

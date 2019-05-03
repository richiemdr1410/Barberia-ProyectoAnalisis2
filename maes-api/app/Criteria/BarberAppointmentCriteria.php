<?php

namespace App\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class BarberAppointmentCriteria.
 *
 * @package namespace App\Criteria;
 */
class BarberAppointmentCriteria implements CriteriaInterface
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
        $id = $this->request->input('barber_id');
        $model = $this->joinModel($model, $repository);
        $model = $this->joinModelService($model, $repository);
        return $model->where('barber_id', $id);
    }

    protected function joinModel($model, $repository)
    {
        return $model->join('users', 'users.id', '=', 'appointments.id_user');
    }

    protected function joinModelService($model, $repository)
    {
        return $model->join('services', 'services.id', '=', 'appointments.id_service');
    }
}

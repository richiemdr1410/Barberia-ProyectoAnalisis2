<?php

namespace App\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class ClientAppointmentCriteria.
 *
 * @package namespace App\Criteria;
 */
class ClientAppointmentCriteria implements CriteriaInterface
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
        $id = $this->request->input('id_user');
        $model = $this->joinModel($model, $repository);
        $model = $this->joinModelService($model, $repository);
        return $model->where('id_user', $id);
    }

    protected function joinModel($model, $repository)
    {
        return $model->join('users', 'users.id', '=', 'appointments.barber_id');
    }

    protected function joinModelService($model, $repository)
    {
        return $model->join('services', 'services.id', '=', 'appointments.id_service');
    }
}

<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\ScheduleByBarberRepository;
use App\Entities\ScheduleByBarber;
use App\Validators\ScheduleByBarberValidator;

/**
 * Class ScheduleByBarberRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class ScheduleByBarberRepositoryEloquent extends BaseRepository implements ScheduleByBarberRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ScheduleByBarber::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return ScheduleByBarberValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
    
}

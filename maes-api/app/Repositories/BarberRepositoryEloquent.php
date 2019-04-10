<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\barberRepository;
use App\Entities\Barber;
use App\Validators\BarberValidator;

/**
 * Class BarberRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class BarberRepositoryEloquent extends BaseRepository implements BarberRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Barber::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return BarberValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
    
}

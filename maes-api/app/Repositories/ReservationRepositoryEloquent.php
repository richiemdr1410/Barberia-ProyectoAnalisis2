<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\ReservationRepository;
use App\Entities\Reservation;
use App\Validators\ReservationValidator;

/**
 * Class ReservationRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class ReservationRepositoryEloquent extends BaseRepository implements ReservationRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Reservation::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return ReservationValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
    
}

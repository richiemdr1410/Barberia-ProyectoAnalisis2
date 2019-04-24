<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\CarouselRepository;
use App\Entities\Carousel;
use App\Validators\CarouselValidator;

/**
 * Class CarouselRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class CarouselRepositoryEloquent extends BaseRepository implements CarouselRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Carousel::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return CarouselValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
    
}

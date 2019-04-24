<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\UploadImageRepository;
use App\Entities\UploadImage;
use App\Validators\UploadImageValidator;

/**
 * Class UploadImageRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class UploadImageRepositoryEloquent extends BaseRepository implements UploadImageRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return UploadImage::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return UploadImageValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
    
}

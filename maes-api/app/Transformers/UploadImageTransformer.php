<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\UploadImage;

/**
 * Class UploadImageTransformer.
 *
 * @package namespace App\Transformers;
 */
class UploadImageTransformer extends TransformerAbstract
{
    /**
     * Transform the UploadImage entity.
     *
     * @param \App\Entities\UploadImage $model
     *
     * @return array
     */
    public function transform(UploadImage $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}

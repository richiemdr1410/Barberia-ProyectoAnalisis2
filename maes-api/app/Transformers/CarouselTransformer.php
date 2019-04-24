<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Carousel;

/**
 * Class CarouselTransformer.
 *
 * @package namespace App\Transformers;
 */
class CarouselTransformer extends TransformerAbstract
{
    /**
     * Transform the Carousel entity.
     *
     * @param \App\Entities\Carousel $model
     *
     * @return array
     */
    public function transform(Carousel $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}

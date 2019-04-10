<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Barber;

/**
 * Class BarberTransformer.
 *
 * @package namespace App\Transformers;
 */
class BarberTransformer extends TransformerAbstract
{
    /**
     * Transform the Barber entity.
     *
     * @param \App\Entities\Barber $model
     *
     * @return array
     */
    public function transform(Barber $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}

<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\ScheduleByBarber;

/**
 * Class ScheduleByBarberTransformer.
 *
 * @package namespace App\Transformers;
 */
class ScheduleByBarberTransformer extends TransformerAbstract
{
    /**
     * Transform the ScheduleByBarber entity.
     *
     * @param \App\Entities\ScheduleByBarber $model
     *
     * @return array
     */
    public function transform(ScheduleByBarber $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}

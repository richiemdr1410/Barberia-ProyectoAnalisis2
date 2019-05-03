<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Schedule;

/**
 * Class ScheduleTransformer.
 *
 * @package namespace App\Transformers;
 */
class ScheduleTransformer extends TransformerAbstract
{
    /**
     * Transform the Schedule entity.
     *
     * @param \App\Entities\Schedule $model
     *
     * @return array
     */
    public function transform(Schedule $model)
    {
        return [
            'id'         => (int) $model->id,

            'hour' =>  date( 'h:i:s a', strtotime($model->hour)),

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}

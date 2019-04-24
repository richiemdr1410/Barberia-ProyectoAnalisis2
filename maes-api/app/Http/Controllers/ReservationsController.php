<?php

namespace App\Http\Controllers;

use App\Entities\Product;
use App\Entities\Reservation;
use Illuminate\Http\Request;
use App\Criteria\ReservationCriteria;
use App\Validators\ReservationValidator;
use App\Repositories\ReservationRepository;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;

/**
 * Class ReservationsController.
 *
 * @package namespace App\Http\Controllers;
 */
class ReservationsController extends Controller
{
    /**
     * @var ReservationRepository
     */
    protected $repository;

    /**
     * @var ReservationValidator
     */
    protected $validator;

    /**
     * ReservationsController constructor.
     *
     * @param ReservationRepository $repository
     * @param ReservationValidator $validator
     */
    public function __construct(ReservationRepository $repository, ReservationValidator $validator)
    {
        $this->repository = $repository;
        $this->validator  = $validator;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $reservations = $this->repository->all();

        return response()->json([
            'data' => $reservations,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function store(Request $request)
    {
        try {

            Product::where('id', $request->input('product_id'))->decrement('quantity', $request->input('reservation_quantity'));

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $reservation = $this->repository->create($request->all());

            $response = [
                'message' => 'Reservation created.',
                'data'    => $reservation->toArray(),
            ];

            return response()->json($response);
        } catch (ValidatorException $e) {
            return response()->json([
                'error'   => true,
                'message' => $e->getMessageBag()
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $reservation = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $reservation,
            ]);
        }

        return view('reservations.show', compact('reservation'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $reservation = $this->repository->find($id);

        return view('reservations.edit', compact('reservation'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  string $id
     *
     * @return Response
     *
     */
    public function update(Request $request, $id)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $reservation = $this->repository->update($request->all(), $id);

            $response = [
                'message' => 'Reservation updated.',
                'data'    => $reservation->toArray(),
            ];

            return response()->json($response);

        } catch (ValidatorException $e) {

            return response()->json([
                'error'   => true,
                'message' => $e->getMessageBag()
            ]);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reserva = Reservation::where('reservation_id', $id)->first();

        Product::where('id', $reserva->product_id)->increment('quantity', $reserva->reservation_quantity);

        $deleted = Reservation::where('reservation_id', $id);
        $deleted->delete();

        return response()->json([
            'message' => 'Reservation deleted.',
            'deleted' => $deleted,
        ]);
    }

    public function getReservationByUser(Request $request)
    {
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $this->repository->pushCriteria(new ReservationCriteria($request));

        $reservations = $this->repository->all();

        return response()->json([
            'data' => $reservations,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\BarberCreateRequest;
use App\Http\Requests\BarberUpdateRequest;
use App\Repositories\BarberRepository;
use App\Validators\BarberValidator;

/**
 * Class BarbersController.
 *
 * @package namespace App\Http\Controllers;
 */
class BarbersController extends Controller
{
    /**
     * @var BarberRepository
     */
    protected $repository;

    /**
     * @var BarberValidator
     */
    protected $validator;

    /**
     * BarbersController constructor.
     *
     * @param BarberRepository $repository
     * @param BarberValidator $validator
     */
    public function __construct(BarberRepository $repository, BarberValidator $validator)
    {
        $this->repository = $repository;
        $this->validator  = $validator;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $barbers = $this->repository->paginate($request->input('page_size', 50));

        return response()->json($barbers);
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

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $barber = $this->repository->create($request->all());

            $response = [
                'message' => 'Barber created.',
                'data'    => $barber->toArray(),
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
        $barber = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $barber,
            ]);
        }

        return view('barbers.show', compact('barber'));
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
        $barber = $this->repository->find($id);

        return view('barbers.edit', compact('barber'));
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

            $barber = $this->repository->update($request->all(), $id);

            $response = [
                'message' => 'Barber updated.',
                'data'    => $barber->toArray(),
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
        $deleted = $this->repository->delete($id);

        if (request()->wantsJson()) {

            return response()->json([
                'message' => 'Barber deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Barber deleted.');
    }
}

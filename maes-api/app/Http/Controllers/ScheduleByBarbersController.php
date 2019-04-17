<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\ScheduleByBarberCreateRequest;
use App\Http\Requests\ScheduleByBarberUpdateRequest;
use App\Repositories\ScheduleByBarberRepository;
use App\Validators\ScheduleByBarberValidator;

/**
 * Class ScheduleByBarbersController.
 *
 * @package namespace App\Http\Controllers;
 */
class ScheduleByBarbersController extends Controller
{
    /**
     * @var ScheduleByBarberRepository
     */
    protected $repository;

    /**
     * @var ScheduleByBarberValidator
     */
    protected $validator;

    /**
     * ScheduleByBarbersController constructor.
     *
     * @param ScheduleByBarberRepository $repository
     * @param ScheduleByBarberValidator $validator
     */
    public function __construct(ScheduleByBarberRepository $repository, ScheduleByBarberValidator $validator)
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
        $scheduleByBarbers = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $scheduleByBarbers,
            ]);
        }

        return view('scheduleByBarbers.index', compact('scheduleByBarbers'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ScheduleByBarberCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function store(ScheduleByBarberCreateRequest $request)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $scheduleByBarber = $this->repository->create($request->all());

            $response = [
                'message' => 'ScheduleByBarber created.',
                'data'    => $scheduleByBarber->toArray(),
            ];

            if ($request->wantsJson()) {

                return response()->json($response);
            }

            return redirect()->back()->with('message', $response['message']);
        } catch (ValidatorException $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'error'   => true,
                    'message' => $e->getMessageBag()
                ]);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
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
        $scheduleByBarber = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $scheduleByBarber,
            ]);
        }

        return view('scheduleByBarbers.show', compact('scheduleByBarber'));
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
        $scheduleByBarber = $this->repository->find($id);

        return view('scheduleByBarbers.edit', compact('scheduleByBarber'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ScheduleByBarberUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function update(ScheduleByBarberUpdateRequest $request, $id)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $scheduleByBarber = $this->repository->update($request->all(), $id);

            $response = [
                'message' => 'ScheduleByBarber updated.',
                'data'    => $scheduleByBarber->toArray(),
            ];

            if ($request->wantsJson()) {

                return response()->json($response);
            }

            return redirect()->back()->with('message', $response['message']);
        } catch (ValidatorException $e) {

            if ($request->wantsJson()) {

                return response()->json([
                    'error'   => true,
                    'message' => $e->getMessageBag()
                ]);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
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
                'message' => 'ScheduleByBarber deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'ScheduleByBarber deleted.');
    }
}

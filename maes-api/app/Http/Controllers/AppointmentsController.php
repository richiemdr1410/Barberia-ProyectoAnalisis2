<?php

namespace App\Http\Controllers;

use App\Criteria\AppointmentCriteria;
use App\Entities\Appointment;
use App\Entities\Schedule;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\AppointmentCreateRequest;
use App\Http\Requests\AppointmentUpdateRequest;
use App\Repositories\AppointmentRepository;
use App\Validators\AppointmentValidator;

/**
 * Class AppointmentsController.
 *
 * @package namespace App\Http\Controllers;
 */
class AppointmentsController extends Controller
{
    /**
     * @var AppointmentRepository
     */
    protected $repository;

    /**
     * @var AppointmentValidator
     */
    protected $validator;

    /**
     * AppointmentsController constructor.
     *
     * @param AppointmentRepository $repository
     * @param AppointmentValidator $validator
     */
    public function __construct(AppointmentRepository $repository, AppointmentValidator $validator)
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
        $this->repository->pushCriteria(AppointmentCriteria::class);
        $appointments = $this->repository->all();



            return response()->json([
                'data' => $appointments,
            ]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  AppointmentCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function store(Request $request)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $appointment = $this->repository->create($request->all());

            $response = [
                'message' => 'Appointment created.',
                'data'    => $appointment->toArray(),
            ];

            return response()->json($response);
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
        $appointment = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $appointment,
            ]);
        }

        return view('appointments.show', compact('appointment'));
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
        $appointment = $this->repository->find($id);

        return view('appointments.edit', compact('appointment'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  AppointmentUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function update(Request $request, $id)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $appointment = $this->repository->update($request->all(), $id);

            $response = [
                'message' => 'Appointment updated.',
                'data'    => $appointment->toArray(),
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
                'message' => 'Appointment deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Appointment deleted.');
    }

    public function getAppointment(Request $request)
    {
        if (!$request->input('barber_id')) {
            $request['barber_id'] = User::first()->id;
        }

        $date = $request->input('date');
        $day_of_week = date('N', strtotime($date));
        $time = date("H:i", strtotime($request->input('time')));
        $schedule = Schedule::where('day', $day_of_week)->get();
        $total = Schedule::where('day', $day_of_week)->count();
        $valid = false;
        for ($i = 0; $i < $total -1; $i++) {
            if($schedule[0]->hour >= $time && $time <= $schedule[$i + 1]->hour) {
                $valid = true;
            }
        }

        if ($valid) {
            $request['time'] = $time;
            unset($request['category_id']);
            $appointment = $this->repository->create($request->all());

            return response()->json([
                'data' => $appointment,
            ]);
        } else {
            return response()->json([
                'error'   => true,
                'message' => 'Error'
            ]);
        }



    }

    public function checkAvailable(Request $request)
    {
        $time = date("H:i", strtotime($request->input('time')));
        $full_date = $request->input('date') .' '. $time.':00';
        $inputDate = strtotime($full_date);
        $now = strtotime(Carbon::now()->addDays(1)->format('Y/m/d H:i:s'));
        if ($inputDate < $now) {
            return response()->json([

                'data' => false,
            ]);
        } else {
            return response()->json([

                'data' => true,
            ]);
        }

    }
}

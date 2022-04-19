package PlanIt.PlanitFrontend.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import main.AppointmentModel;
import main.*;

@RestController
public class PlanItController {
	Persistence fp = new FilePersistence();
	
	@RequestMapping(method=RequestMethod.POST, value="/test")
	public List<Appointment> getAppointmentsInWeek(@ModelAttribute("startdate") String start, @ModelAttribute("enddate") String end) {
		ArrayList<Appointment> appointmentList;
		try {
			appointmentList = new ArrayList<>(fp.loadAppointments());
		} catch (IOException e) {
			e.printStackTrace();
			return appointmentList = new ArrayList<Appointment>();
		}
		appointmentList.stream().filter(appointment -> appointment.getStart().after(new Date(start)));
		appointmentList.stream().filter(appointment -> appointment.getStart().before(new Date(end)));
		return appointmentList;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/create")
	public AppointmentModel createAppointment(@RequestBody AppointmentModel appointment){
		// 
		return appointment;
	}
}

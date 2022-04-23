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
	
	@RequestMapping(method=RequestMethod.POST, value="/getAppointments")
	public List<AppointmentModel> getAppointmentModelsInTimespan(@ModelAttribute("startdate") String start, @ModelAttribute("enddate") String end) {
//		load file into Arraylist
		ArrayList<AppointmentModel> appointmentList;
		try {
//			get filtered list from persistence
			appointmentList = new ArrayList<>(fp.loadAppointmentsAsAppointmentModelsInTimespan(start, end));
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		return appointmentList;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/create")
	public AppointmentModel createAppointment(@RequestBody AppointmentModel appointment){
		// 
		return appointment;
	}
}

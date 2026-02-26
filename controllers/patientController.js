const {
    User,
    Symptom,
    Disease,
    Doctor,
    Booking,
    BookingSymptom
} = require('../models');

class PatientController {
    static async showBookForm(req, res) {
        try {
            const symptoms = await Symptom.findAll()
            res.render('bookForm', { symptoms })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async createBooking(req, res) {
        try {
            const { age, gender, symptoms } = req.body
            const userId = req.session.userId

            if (!userId) {
                return res.redirect('/login')
            }

            if (!symptoms) {
                return res.send('Please select at least one symptom')
            }

            await User.update(
                { age, gender },
                { where: { id: userId } }
            )

            const disease = await Disease.findOne()

            if (!disease) {
                return res.send('Disease data not available')
            }

            const doctor = await Doctor.findOne({
                where: { specialization: disease.specialization }
            })

            if (!doctor) {
                return res.send('Doctor data not available')
            }

            const booking = await Booking.create({
                bookingDate: new Date(),
                status: 'pending',
                UserId: userId,
                DoctorId: doctor.id,
                DiseaseId: disease.id
            })

            let selectedSymptoms = symptoms

            if (!Array.isArray(selectedSymptoms)) {
                selectedSymptoms = [selectedSymptoms]
            }

            await booking.addSymptoms(selectedSymptoms)

            res.redirect('/patients')

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = PatientController;

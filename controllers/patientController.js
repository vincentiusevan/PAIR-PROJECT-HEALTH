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

            let selectedSymptoms = symptoms
            if (!Array.isArray(selectedSymptoms)) {
                selectedSymptoms = [selectedSymptoms]
            }

            await User.update(
                { age, gender },
                { where: { id: userId } }
            )

            const disease = await Disease.findOne({
                include: {
                    model: Symptom,
                    where: {
                        id: selectedSymptoms
                    }
                }
            })

            if (!disease) {
                return res.send('No disease matches selected symptoms')
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

            await booking.addSymptoms(selectedSymptoms)

            res.redirect('/patients')

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async dashboard(req, res) {
        try {
            const userId = req.session.userId

            const user = await User.findByPk(userId)

            const totalBookings = await Booking.count({
                where: { UserId: userId }
            })

            const pending = await Booking.count({
                where: { UserId: userId, status: 'pending' }
            })

            const confirmed = await Booking.count({
                where: { UserId: userId, status: 'confirmed' }
            })

            res.render('patientDashboard', {
                user,
                totalBookings,
                pending,
                confirmed
            })

        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async myBookings(req, res) {
        try {
            const userId = req.session.userId

            const bookings = await Booking.findAll({
                where: { UserId: userId },
                include: [
                    Doctor,
                    Disease,
                    Symptom
                ],
                order: [['createdAt', 'DESC']]
            })

            res.render('listPatientBookings', { bookings })

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = PatientController;



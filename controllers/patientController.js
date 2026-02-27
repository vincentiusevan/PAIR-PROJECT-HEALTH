const QRCode = require('qrcode')
const {
    User,
    UserProfile,
    Symptom,
    Disease,
    Doctor,
    Booking,
    BookingSymptom
} = require('../models');
const { Op } = require('sequelize')

class PatientController {
    static async showBookForm(req, res) {
        try {
            const symptoms = await Symptom.findAll()
            res.render('bookForm', { symptoms, errors: null })
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

            if (!age) {
                const symptomList = await Symptom.findAll()
                return res.render('bookForm', { symptoms: symptomList, errors: ['Age is required'] })
            }

            if (!gender) {
                const symptomList = await Symptom.findAll()
                return res.render('bookForm', { symptoms: symptomList, errors: ['Gender is required'] })
            }

            let selectedSymptoms = symptoms
            if (!Array.isArray(selectedSymptoms)) {
                selectedSymptoms = [selectedSymptoms]
            }

            const disease = await Disease.findOne({
                include: {
                    model: Symptom,
                    where: { id: selectedSymptoms }
                }
            })

            const doctor = await Doctor.findOne({
                where: { specialization: disease ? disease.specialization : null }
            })

            const booking = await Booking.create({
                bookingDate: new Date(),
                status: 'pending',
                UserId: userId,
                DoctorId: doctor ? doctor.id : null,
                DiseaseId: disease ? disease.id : null
            })

            await User.update({ age, gender }, { where: { id: userId } })
            await booking.addSymptoms(selectedSymptoms)
            res.redirect('/patients')

        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errors = error.errors.map(el => el.message)
                const symptomList = await Symptom.findAll()
                return res.render('bookForm', { symptoms: symptomList, errors })
            }
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
                include: [User, Doctor, Disease, Symptom],
                order: [['createdAt', 'DESC']]
            })

            const bookingsWithQR = await Promise.all(
                bookings.map(async (booking) => {
                    const qrData = `Booking ID: ${booking.id}\nPatient: ${booking.User.username}\nDoctor: ${booking.Doctor ? booking.Doctor.name : '-'}\nDisease: ${booking.Disease ? booking.Disease.name : '-'}\nDate: ${new Date(booking.bookingDate).toLocaleDateString('en-US')}\nStatus: ${booking.status}`

                    const qrCode = await QRCode.toDataURL(qrData)

                    return { ...booking.toJSON(), qrCode, originalBooking: booking }
                })
            )

            res.render('myBookings', { bookings: bookingsWithQR })

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async showDoctors(req, res) {
        try {
            const { search } = req.query
            let doctors = await Doctor.findAll()

            if (search) {
                doctors = await Doctor.findAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    }
                })
            }

            res.render('patientDoctors', { doctors, search })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async showProfile(req, res) {
        try {
            const userId = req.session.userId
            const user = await User.findByPk(userId)
            const profile = await UserProfile.findOne({ where: { UserId: userId } })
            const { notif } = req.query
            res.render('profile', { user, profile, notif })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async updateProfile(req, res) {
        try {
            const userId = req.session.userId
            const { bloodType, address, phone } = req.body

            const existing = await UserProfile.findOne({ where: { UserId: userId } })

            if (existing) {
                await existing.update({ bloodType, address, phone })
            } else {
                await UserProfile.create({ UserId: userId, bloodType, address, phone })
            }

            res.redirect('/patients/profile?notif=Profile updated successfully!')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = PatientController;



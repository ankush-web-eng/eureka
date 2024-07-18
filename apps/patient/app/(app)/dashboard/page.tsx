import DoctorCard from "@/components/DoctorCard"

interface Doctor {
    name: string;
    hospital: string;
    slots: Slot[];
    profile: string;
    city: string;
}

interface Slot {
    id: number;
    date: string;
    time: string;
}

export default function Page() {

    const doctor = {
        name: "John Doe",
        hospital: "City Hospital",
        slots: [
            {
                id: 1,
                date: "12/12/2021",
                time: "10:00 AM"
            },
            {
                id: 2,
                date: "12/12/2021",
                time: "11:00 AM"
            },
            {
                id: 3,
                date: "12/12/2021",
                time: "12:00 PM"
            },
            {
                id: 4,
                date: "12/12/2021",
                time: "01:00 PM"
            },
            {
                id: 5,
                date: "12/12/2021",
                time: "02:00 PM"
            },
            {
                id: 6,
                date: "12/12/2021",
                time: "03:00 PM"
            },
            {
                id: 7,
                date: "12/12/2021",
                time: "04:00 PM"
            },
            {
                id: 8,
                date: "12/12/2021",
                time: "05:00 PM"
            }
        ],
        profile: "https://res.cloudinary.com/dhnbk23gf/image/upload/v1718277516/s4qx0q78enpw9cmvwrti.png",
        city : "Mathura"
    }

    return (
        <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Our Doctors</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* {doctor.map((doctor : Doctor, index : any) => ( */}
                <DoctorCard params={doctor} />
                <DoctorCard params={doctor} />
                <DoctorCard params={doctor} />
                <DoctorCard params={doctor} />
                <DoctorCard params={doctor} />
                <DoctorCard params={doctor} />
                <DoctorCard params={doctor} />
                <DoctorCard params={doctor} />
                <DoctorCard params={doctor} />
                <DoctorCard params={doctor} />
              {/* ))} */}
            </div>
          </div>
        </div>
      );
}
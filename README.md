<!-- ![alt text](https://github.com/ankush-web-eng/eureka/tree/main/apps/patient/public/landing.png?raw=true) -->

<div align="center">
<img src = "/assets/landing.png">
<h1 align="center">Medzo</h1>
</div>

# Medzo

## Book Appointments to clinics in your city

### Meet your favourite doctors and book appointments with ease without waiting in long queues

Our application allows patients to book appointmnts to ther favourite doctors in their city,
saving them a lot of time including going to doctor for booking an appointment, or calling reception
then going there and wating in long queues.

So, to book an appointment, simply go to [Medzo](https://medzo.ankushsingh.live)
or if you are a Doctor (or clinic), go to [Doctor-Dashboard](https://doctor.medzo.ankushsingh.live)

## If you are a dev curious about our code, follow below mentioned steps:

### Clone this repo

```bash
git clone https://github.com/ankush-web-eng/eureka
```

### Install the dependencies

```bash
npm install
```

### Run the application

Since this repo is a monorepo, managed by [TURBOREPO](https://turbo.build)

- if you want to start all the 3 apps simultaneously, run following command:

```bash
npm run dev
```

- or you want to run any individual application, go to that app by:

```bash
cd apps
```

- then "cd" into your desired app:

```bash
cd doctor && npm run dev
```

You will find the port on which application has started in console

## Happy Coding

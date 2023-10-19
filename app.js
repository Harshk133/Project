// import OpenAI from 'openai';
// import express from "express";
// import fs from 'fs';
// import path from 'path';
// import PizZip from 'pizzip';
// import Docxtemplater from 'docxtemplater';
// import bodyParser from 'body-parser';
const OpenAI = require("openai");
const express = require("express");
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
var bodyParser = require("body-parser");
var app = express();

const port = 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "hbs");

const messages = [];
const outputanswer = [];
const openai = new OpenAI({
    apiKey: "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",
});

async function main(input) {
    // messages.push({ role: 'user', content: input });
    messages.push({
        role: 'user', content: `
        give the example response for following points if the microproject title provided by user is "${input}"
        based on these sections in document
        1.	Aims/Benefits of the Micro-Project:
        2.	Course Outcome Addressed:
        3.	Proposed Methodology
        4.	Rationale
        5.	Literature Review
        6. Actual Methodology Followed
        7.	Skill developed / Learning out of this Micro-Project:
        8.	Applications of this Micro-Project
        Give the response in object in the following manner to destrucutre the key and put it into the document, Follwoing is the example object          
        {
            "microprojectTitle": "Computer Science",
            "content": "This microproject explores the diverse and ever-evolving field of computer science. Students will delve into the world of algorithms, programming, and cutting-edge technologies, gaining a strong foundation in this critical discipline. It serves as a gateway to the digital age and its dynamic possibilities.",
            "aimsBenefits": "The primary aims and benefits of this microproject are to:",
            "aims": [
                "Cultivate a deep understanding of computer science fundamentals.",
                "Enhance problem-solving and critical thinking skills.",
                "Develop proficiency in various programming languages.",
                "Explore emerging technologies and their real-world applications.",
                "Foster an appreciation for the importance of computer science in modern society."
            ],
            "courseOutcome": "Upon successful completion of this microproject, students will achieve an enhanced understanding of the following course outcomes:",
            "courseOutcomes": [
                "Master core programming concepts and algorithms.",
                "Demonstrate proficiency in software development and coding practices.",
                "Apply theoretical knowledge to practical problem-solving.",
                "Evaluate and adapt to evolving technology trends.",
                "Participate in collaborative projects and teamwork.",
                "Engage in continuous learning and adaptability in the field."
            ],
            "proposedMethodology": "The proposed methodology for this microproject includes a mix of theoretical learning and practical application:",
            "methodologyDetails": [
                "Lectures and in-depth discussions on computer science concepts and theories.",
                "Hands-on coding exercises and programming assignments.",
                "Real-world case studies and project work to apply knowledge in practice.",
                "Guest lectures by industry experts to provide insights into current trends.",
                "Regular assessments and feedback to track progress and learning."
            ],
            "rationale": "The rationale behind selecting this microproject lies in the fundamental importance of computer science in today's digital age. It is vital for students to develop a solid grasp of the core concepts in this field.",
            "rationaleDetails": "In an increasingly technology-driven world, computer science is the backbone of innovation and progress. It underpins fields ranging from artificial intelligence to cybersecurity, and a strong foundation in computer science is essential for students to excel in a variety of careers. This microproject aims to equip students with the knowledge and skills needed to thrive in a technology-dependent society.",
            "literatureReview": "This microproject is supported by an extensive literature review that covers the history of computer science, emerging technologies, and the impact of computer science in various industries.",
            "literatureReviewDetails": "The literature review delves into the evolution of computer science, from its historical roots to contemporary advancements. It also explores the transformative role of computer science in sectors such as healthcare, finance, and entertainment. By studying the literature, students gain insights into the profound impact of technology on society and the countless opportunities it offers for innovation.",
            "actualMethodology": "Throughout the execution of this microproject, students will participate in coding exercises, projects, and hands-on activities, enabling them to apply their knowledge in real-world scenarios.",
            "actualMethodologyDetails": "Students will engage in a variety of activities, including coding challenges to reinforce programming skills, collaborative projects to simulate real-world scenarios, and hands-on experiments with emerging technologies. This practical approach ensures that students not only understand computer science concepts but can also apply them effectively, preparing them for the challenges of a technology-driven job market.",
            "skillsDeveloped": "Engaging in this microproject will empower students with essential computer science skills, including programming, problem-solving, algorithm design, and critical thinking. They will also gain experience in software development and technology trends.",
            "skillsDevelopedDetails": "Participating in this microproject hones a wide range of skills, including:",
            "skillsList": [
                "Proficiency in multiple programming languages.",
                "Effective algorithm design and optimization.",
                "Critical thinking and problem-solving abilities.",
                "Strong software development and coding practices.",
                "Adaptability to evolving technology trends and tools.",
                "Collaborative teamwork and communication skills."
            ]
        } 
        Give Response 2X of above object!
    `
    });
    // messages.push({
    //     role: 'user', content: `
    //     give the example response for following points if the microproject title provided by user is "${input}"
    //     based on these sections in document
    //     1.	Aims/Benefits of the Micro-Project:
    //     2.	Course Outcome Addressed:
    //     3.	Proposed Methodology
    //     4.	Rationale
    //     5.	Literature Review
    //     6. Actual Methodology Followed
    //     7.	Skill developed / Learning out of this Micro-Project:
    //     8.	Applications of this Micro-Project
    //     Give the response in object in the following manner to destrucutre the key and put it into the document, Follwoing is the example object          
    //      {
    //         "microprojectTitle": "Business Analyst",
    //         "content": "This comprehensive microproject delves into the dynamic field of business analysis. By engaging in this educational endeavor, students will immerse themselves in the intricate world of data-driven decision-making and organizational development.",
    //         "aimsBenefits": "The primary aims and benefits of this microproject are to motivate students to:",
    //         "courseOutcome": "Upon successfully completing this microproject, students will achieve an enhanced understanding of the following course outcomes:",
    //         "proposedMethodology": "The proposed methodology for this microproject encompasses a diverse range of engaging activities, practical problem-solving, and strategic analysis:",
    //         "rationale": "The rationale behind selecting this microproject is deeply rooted in the pivotal role of business analysts in modern organizations, highlighting the importance of honing these skills.",
    //         "literatureReview": "This microproject is enriched by an extensive literature review that uncovers critical insights into evolving business practices, emerging trends, and the impact of data analytics in decision-making processes.",
    //         "actualMethodology": "Throughout the execution of this microproject, students will actively engage in real-world business case studies, data analysis, and gain practical experience in solving complex business problems, thus gaining a comprehensive understanding of their role as business analysts.",
    //         "skillsDeveloped": "Engaging in this microproject will empower students with a versatile skill set and invaluable learning experiences. They will hone their data analysis, critical thinking, and problem-solving skills while gaining a deep understanding of how data-driven insights drive business strategy.",
    //         "applications": "The knowledge and skills acquired through this microproject will have far-reaching applications in the world of business, aiding in informed decision-making, process optimization, and contributing to the success and growth of various organizations across industries."
    //     };
    // `
    // });
    const chatCompletion = await openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
    });
    return chatCompletion.choices[0]?.message?.content;
}

async function botAnswer(userInput) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'Hello, I am MugBit Bot!\nHow Can I Help You to create new documents and How I Help You to get Data from me!',
                },
                {
                    role: 'user',
                    content: userInput,
                },
            ],
            model: 'gpt-3.5-turbo',
        });

        return chatCompletion.choices[0]?.message?.content;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get a response from the Chatbot API');
    }
}

app.get("/", (req, res) => {
    res.render("index", {
        programmerName: "Harsh Moreshwar Kale"
    });
});

app.get("/contactus", (req, res) => {
    res.render("contactus");
});

app.get("/documentation", (req, res) => {
    res.render("documentation");
});

app.post("/api", async (req, res, next) => {
    let input = req.body.prompt;
    const result = await main(input);
    res.render("index", {
        success: true,
        message: result,
        programmerName: "Harsh Moreshwar Kale"
    });
});

app.get('/bot/mugbot', async (req, res) => {
    res.render("mugbot");
});

app.post('/bot/mugbot', async (req, res) => {
    // const userinput = req.query.userInput; // Access user input from the query parameter
    // const botresponse = await botAnswer(userinput);
    try {
        const userMessage = req.body.message;
        console.log(userMessage);
        const chatbotResponse = await botAnswer(userMessage);
        res.json({ response: chatbotResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }


    // res.render("mugbot", {
    //     success: true,
    //     message: botresponse
    // });
});

app.get("/*", (req, res) => {
    res.render("404");
});

app.post("/microproject", async (req, res) => {
    const microprojectTitle = req.body.microprojectitle;
    try {
        const apiResponse = await main(microprojectTitle);
        if (!apiResponse) {
            res.status(500).send('Error fetching data from API');
            return;
        }
        console.log(apiResponse, typeof apiResponse);
        const result = await JSON.parse(apiResponse);
        console.log(result, typeof result);
        console.log(result.literatureReview);
        const templateFile = fs.readFileSync("D:\\MyPrograms\\aajchaabhyass.com\\Java Practice Programs\\MugBit AI\\public\\templateDocx\\Microproject.docx", 'binary');
        const zip = new PizZip(templateFile);
        let outputDocument = new Docxtemplater(zip);
        const dataToAdd_microproject = {
            STUDENT_NAME: req.body.username,
            STUDENT_ENR: req.body.userenrollmentnumber,
            MICROPROJECT_TITLE: microprojectTitle,
            TEACHER_NAME: req.body.teachername,
            ROLLNO: req.body.rollnumber,
            AIMSBENEFITS: result.aimsBenefits,
            COURSEOUTCOME: result.courseOutcome,
            PROPOSEDMETHODOLOGY: result.proposedMethodology,
            RATIONALE: result.rationale,
            LITERATUREREVIEW: result.literatureReview,
            ACTUALMETHODOLOGY: result.actualMethodology,
            SKILLSDEVELOPED: result.skillsDeveloped,
            APPLICATIONS: result.applications
        };
        outputDocument.setData(dataToAdd_microproject);
        try {
            outputDocument.render();
            let outputDocumentBuffer = outputDocument.getZip().generate({ type: 'nodebuffer' });
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${req.body.username}-computer-certificate.docx`);
            res.send(outputDocumentBuffer);
        } catch (error) {
            console.error('ERROR Filling out Template:');
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('ERROR Fetching Data from API:');
        console.error(error);
        res.status(500).send('Error fetching data from API');
    }

});

app.post("/microprojectpl", (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const nextYear = currentYear + 1;
        const yearRange = `${currentYear}-${nextYear}`;
        const templateFile = fs.readFileSync("D:\\MyPrograms\\aajchaabhyass.com\\Java Practice Programs\\MugBit AI\\public\\templateDocx\\PL_Microproject_Template.docx", 'binary');
        const zip = new PizZip(templateFile);
        let outputDocument = new Docxtemplater(zip);
        const dataToAdd_microproject = {
            MICROPROJECT_TITLE: req.body.microprojectname,
            YEARNSPAN: yearRange,
            DEPARTMENT: req.body.department,
            FIRST_STUDENT: req.body.studentname1,
            SECOND_STUDENT: req.body.studentname2,
            THIRD_STUDENT: req.body.studentname3,
            FOURTH_STUDENT: req.body.studentname4,
            FIFTH_STUDENT: req.body.studentname5,
            RN1: req.body.studentrollno1,
            RN2: req.body.studentrollno2,
            RN3: req.body.studentrollno3,
            RN4: req.body.studentrollno4,
            RN5: req.body.studentrollno5,
            TEACHER_NAME: req.body.teachername,
            ENRNOFIRST: req.body.studentenrno1,
            ENRNOSECOND: req.body.studentenrno2,
            ENRNOTHIRD: req.body.studentenrno3,
            ENRNOFOURTH: req.body.studentenrno4,
            ENRNOFIFTH: req.body.studentenrno5,
            SUBJECT_NAME: req.body.subject,
            SEM: req.body.semesterno
        };
        outputDocument.setData(dataToAdd_microproject);
        try {
            outputDocument.render();
            let outputDocumentBuffer = outputDocument.getZip().generate({ type: 'nodebuffer' });
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${req.body.microprojectname}-pl-microproject.docx`);
            res.send(outputDocumentBuffer);
        } catch (error) {
            console.error('ERROR Filling out Template:');
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('ERROR Fetching Data from API:');
        console.error(error);
        res.status(500).send('Error fetching data from API');
    }

});

app.post("/microprojectpltwo", async (req, res) => {
    const microtopictwo = req.body.microprojectitle;
    try {
        const apiResponseTwo = await main(microtopictwo);
        if (!apiResponseTwo) {
            res.status(500).send('Error fetching data from API');
            return;
        }
        console.log(apiResponseTwo, typeof apiResponseTwo);
        const resultTwo = await JSON.parse(apiResponseTwo);
        console.log(resultTwo, typeof resultTwo);
        console.log(resultTwo.literatureReview);
        const templateFile = fs.readFileSync("D:\\MyPrograms\\aajchaabhyass.com\\Java Practice Programs\\MugBit AI\\public\\templateDocx\\Micro_Projects _Report_Format_PL_2.docx", 'binary');
        const zip = new PizZip(templateFile);
        let outputDocument = new Docxtemplater(zip);
        const dataToAdd_microproject = {
            microprojectTitle: req.body.microprojectitle,
            contentdata: resultTwo.content,
            aimsBenefits: resultTwo.aimsBenefits,
            items: [
                { description: resultTwo.aims[0] },
                { description: resultTwo.aims[1] },
                { description: resultTwo.aims[2] },
            ],
            courseOutcomes: resultTwo.courseOutcome,
            elem: [
                { descs: resultTwo.courseOutcomes[0] },
                { descs: resultTwo.courseOutcomes[1] },
                { descs: resultTwo.courseOutcomes[2] },
            ],
            actualMethodology: resultTwo.proposedMethodology,
            methodologyDetails: resultTwo.methodologyDetails,
            rationaledata: resultTwo.rationale,
            skillsDeveloped: resultTwo.skillsDevelopedDetails,
            skilllistdata: resultTwo.skillsList 
        };
        outputDocument.setData(dataToAdd_microproject);
        try {
            outputDocument.render();
            let outputDocumentBuffer = outputDocument.getZip().generate({ type: 'nodebuffer' });
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${req.body.microprojectitle}-pl-microproject.docx`);
            res.send(outputDocumentBuffer);
        } catch (error) {
            console.error('ERROR Filling out Template:');
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('ERROR Fetching Data from API:');
        console.error(error);
        res.status(500).send('Error fetching data from API');
    }
});

// ###################################################################################

app.get("/", (req, res) => {
    res.render("index");
});

app.post('/docx', (req, res) => {
    console.log(req.body);
    try {
        const templateFile = fs.readFileSync("D:\\MyPrograms\\aajchaabhyass.com\\Java Practice Programs\\MugBit AI\\public\\templateDocx\\Sample_template_certificate.docx", 'binary');
        const zip = new PizZip(templateFile);
        let outputDocument = new Docxtemplater(zip);

        const dataToAdd_certificate = {
            STUDENT_NAME: req.body.name,
            STUDENT_ENR: req.body.enrollmentno,
            COI: req.body.coi,
            MICROPROJECT_TITLE: req.body.micorprojecttitle,
            COSUBJECT: req.body.cosubject,
            TEACHER_NAME: req.body.teachername
        };
        outputDocument.setData(dataToAdd_certificate);

        try {
            outputDocument.render()
            let outputDocumentBuffer = outputDocument.getZip().generate({ type: 'nodebuffer' });

            // Set appropriate headers for the response
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${req.body.name}-computer-certificate.docx`);

            // Send the generated DOCX file to the client for download
            res.send(outputDocumentBuffer);
        }
        catch (error) {
            console.error('ERROR Filling out Template:');
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('ERROR Loading Template:');
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/microprojectt', (req, res) => {
    console.log(req.body);
    try {
        const templateFile = fs.readFileSync("D:\\MyPrograms\\aajchaabhyass.com\\Java Practice Programs\\MugBit AI\\public\\templateDocx\\EST.docx", 'binary');
        const zip = new PizZip(templateFile);
        let outputDocument = new Docxtemplater(zip);

        const dataToAdd = {
            STUDENT_NAME: req.body.name,
            STUDENT_ENR: req.body.enrollmentno,
            ROLLNO: req.body.rollno,
            TEACHER_NAME: req.body.teacher
        };
        outputDocument.setData(dataToAdd);

        try {
            outputDocument.render()
            let outputDocumentBuffer = outputDocument.getZip().generate({ type: 'nodebuffer' });

            // Set appropriate headers for the response
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${req.body.name}-computer-certificate.docx`);

            // Send the generated DOCX file to the client for download
            res.send(outputDocumentBuffer);
        }
        catch (error) {
            console.error('ERROR Filling out Template:');
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('ERROR Loading Template:');
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/civilcertificate', (req, res) => {
    console.log(req.body);
    try {
        const templateFile = fs.readFileSync("D:\\MyPrograms\\aajchaabhyass.com\\Java Practice Programs\\MugBit AI\\public\\templateDocx\\civil_certificate.docx", 'binary');
        const zip = new PizZip(templateFile);
        let outputDocument = new Docxtemplater(zip);

        const dataToAdd = {
            MicroprojectTitle: req.body.MicroprojectTitle,
            yr: req.body.yr,
            STUD_NAME: req.body.stud_name,
            stdName2: req.body.stdName2,
            stdName3: req.body.stdName3,
            stdName4: req.body.stdName4,
            STUD_ENR: req.body.stud_enr,
            stdEnr2: req.body.stdEnr2,
            stdEnr3: req.body.stdEnr3,
            stdEnr4: req.body.stdEnr4,
            profSirName: req.body.profSirName,
            Subject: req.body.Subject,
            HOD: req.body.hod,
            Principal: req.body.Principal,
            sem: req.body.sem,
        };
        outputDocument.setData(dataToAdd);

        try {
            outputDocument.render()
            let outputDocumentBuffer = outputDocument.getZip().generate({ type: 'nodebuffer' });

            // Set appropriate headers for the response
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${req.body.stud_name}-computer-certificate.docx`);

            // Send the generated DOCX file to the client for download
            res.send(outputDocumentBuffer);
        }
        catch (error) {
            console.error('ERROR Filling out Template:');
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('ERROR Loading Template:');
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/entccertificate', (req, res) => {
    console.log(req.body);
    try {
        const templateFile = fs.readFileSync("D:\\MyPrograms\\aajchaabhyass.com\\Java Practice Programs\\MugBit AI\\public\\templateDocx\\Electronic_and_Telecommunication_certificate.docx", 'binary');
        const zip = new PizZip(templateFile);
        let outputDocument = new Docxtemplater(zip);

        const dataToAdd = {
            MicroprojectTitle: req.body.MicroprojectTitle,
            yr: req.body.yr,
            STUD_NAME: req.body.stud_name,
            STUD_ENR: req.body.stud_enr,
            profSirName: req.body.profSirName,
            Subject: req.body.Subject,
            HOD: req.body.hod,
            Principal: req.body.Principal,
            sem: req.body.sem,
        };
        outputDocument.setData(dataToAdd);

        try {
            outputDocument.render()
            let outputDocumentBuffer = outputDocument.getZip().generate({ type: 'nodebuffer' });

            // Set appropriate headers for the response
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${req.body.stud_name}-computer-certificate.docx`);

            // Send the generated DOCX file to the client for download
            res.send(outputDocumentBuffer);
        }
        catch (error) {
            console.error('ERROR Filling out Template:');
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('ERROR Loading Template:');
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});



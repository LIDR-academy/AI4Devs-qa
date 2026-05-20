const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Create Companies
    const company1 = await prisma.company.create({
      data: {
        name: 'LTI',
      },
    });

    // Create Interview Flows
    const interviewFlow1 = await prisma.interviewFlow.create({
      data: {
        description: 'Standard development interview process',
      },
    });

    const interviewFlow2 = await prisma.interviewFlow.create({
      data: {
        description: 'Data science interview process',
      },
    });

    // Create Positions
    const position1 = await prisma.position.create({
      data: {
        title: 'Senior Full-Stack Engineer',
        description: 'Develop and maintain software applications.',
        status: 'Open',
        isVisible: true,
        location: 'Remote',
        jobDescription: 'Full-stack development',
        companyId: company1.id,
        interviewFlowId: interviewFlow1.id,
        salaryMin: 50000,
        salaryMax: 80000,
        employmentType: 'Full-time',
        benefits: 'Health insurance, 401k, Paid time off',
        contactInfo: 'hr@lti.com',
        requirements: '3+ years of experience in software development, knowledge in React and Node.js',
        responsibilities: 'Develop, test, and maintain software solutions.',
        companyDescription: 'LTI is a leading HR solutions provider.',
        applicationDeadline: new Date('2024-12-31')
      },
    });

    // Create Interview Types
    const interviewType1 = await prisma.interviewType.create({
      data: {
        name: 'HR Interview',
        description: 'Assess overall fit, tech stack, salary range and availability',
      },
    });

    const interviewType2 = await prisma.interviewType.create({
      data: {
        name: 'Technical Interview',
        description: 'Assess technical skills',
      },
    });

    // Create Interview Steps
    const interviewStep1 = await prisma.interviewStep.create({
      data: {
        interviewFlowId: interviewFlow1.id,
        interviewTypeId: interviewType1.id,
        name: 'Initial Screening',
        orderIndex: 1,
      },
    });

    const interviewStep2 = await prisma.interviewStep.create({
      data: {
        interviewFlowId: interviewFlow1.id,
        interviewTypeId: interviewType2.id,
        name: 'Technical Interview',
        orderIndex: 2,
      },
    });

    // Create Candidate
    const candidate1 = await prisma.candidate.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main St',
        educations: {
          create: [
            {
              institution: 'University A',
              title: 'BSc Computer Science',
              startDate: new Date('2015-09-01'),
              endDate: new Date('2019-06-01'),
            },
          ],
        },
        workExperiences: {
          create: [
            {
              company: 'Company A',
              position: 'Software Developer',
              description: 'Developed web applications',
              startDate: new Date('2019-07-01'),
              endDate: new Date('2021-08-01'),
            },
          ],
        },
        resumes: {
          create: [
            {
              filePath: '/resumes/john_doe.pdf',
              fileType: 'application/pdf',
              uploadDate: new Date(),
            },
          ],
        },
      },
    });

    // Create Application
    const application1 = await prisma.application.create({
      data: {
        positionId: position1.id,
        candidateId: candidate1.id,
        applicationDate: new Date(),
        currentInterviewStep: interviewStep1.id,
        notes: 'Promising candidate',
      },
    });

    console.log('Database has been seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 
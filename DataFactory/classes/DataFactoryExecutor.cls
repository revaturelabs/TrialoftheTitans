public with sharing class DataFactoryExecutor {

    public static void initDataFactory(){
        ApexDataFactory.CreateCurriculum();
        ApexDataFactory.CreateCohort();
        ApexDataFactory.CreateTeam();
        ApexDataFactory.CreateSquad();
        ApexDataFactory.CreateAccount();
        ApexDataFactory.CreateTitan();
        ApexDataFactory.CreateSkill();
        ApexDataFactory.CreateQCInterview();
        ApexDataFactory.CreateEducation();
        ApexDataFactory.CreateExam();
        ApexDataFactory.CreateExamQuestion();
        ApexDataFactory.CreateExamResult();
        ApexDataFactory.CreateHeroAnswer();  
    }
}
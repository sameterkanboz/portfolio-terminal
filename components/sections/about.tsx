export function About() {
  return (
    <div className="space-y-4">
      <div className="text-xl text-green-400 mb-4">$ cat about.txt</div>

      <pre className="whitespace-pre-wrap">
        {`
USER PROFILE
-----------
NAME: [Your Name]
LOCATION: [Your Location]
TITLE: [Your Job Title]
STATUS: Available for opportunities

ABOUT
-----
I am a passionate developer with a strong background in [your specialties]. 
My journey in technology began [brief background].

I enjoy solving complex problems and creating intuitive, efficient solutions.
When I'm not coding, you can find me [your hobbies/interests].

My approach to development focuses on [your development philosophy].

EDUCATION
---------
[Degree] in [Field] - [University] ([Year])
[Any other relevant education/certifications]

EXPERIENCE
----------
[Current/Recent Job Title] at [Company] ([Years])
- [Key responsibility/achievement]
- [Key responsibility/achievement]
- [Key responsibility/achievement]

[Previous Job Title] at [Company] ([Years])
- [Key responsibility/achievement]
- [Key responsibility/achievement]
`}
      </pre>
    </div>
  );
}

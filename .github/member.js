function skillsMember() {
  const member = document.querySelector('.member');
  const memberSkills = document.querySelector('.member__skills');
  const memberSkillsList = document.querySelector('.member__skills-list');

  if (member) {
    member.addEventListener('click', (e) => {
      if (e.target.classList.contains('member__skills')) {
        memberSkills.classList.toggle('member__skills--active');
        memberSkillsList.classList.toggle('member__skills-list--active');
      }
    });
  }
}
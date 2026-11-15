/* English / Khmer switch for the words around the lessons (menu, buttons, headings, messages).
   HOW IT WORKS: the site is written in English. When a visitor chooses Khmer, every English
   sentence below is replaced by its Khmer version. Words in { } are filled in by the site.
   TO FIX A TRANSLATION: change the Khmer text on the right of the colon. Leave the English on the left as it is.
   Lesson titles and lesson text stay in English. Course names and taglines come from data/subjects.json
   (fields name_km and tagline_km). */
(function () {
  const KM = {
    // Menu and general
    'All': 'ទាំងអស់',
    'Contact': 'ទំនាក់ទំនង',
    'Search': 'ស្វែងរក',
    'About': 'អំពីយើង',
    'All lessons': 'មេរៀនទាំងអស់',
    'Free lessons in coding, math and physics. Every lesson is posted by the CHHOYED team.':
      'មេរៀនឥតគិតថ្លៃ ផ្នែកកូដ គណិតវិទ្យា និងរូបវិទ្យា។ មេរៀននីមួយៗត្រូវបានផ្សព្វផ្សាយដោយក្រុម CHHOYED។',

    // Home page
    'lessons': 'មេរៀន',
    'learning paths': 'ផ្លូវសិក្សា',
    'categories': 'មុខវិជ្ជា',
    'authors': 'អ្នកបង្រៀន',
    'Learning paths': 'ផ្លូវសិក្សា',
    'More lessons': 'មេរៀនផ្សេងទៀត',
    'Other lessons': 'មេរៀនផ្សេងទៀត',
    'Our teachers': 'គ្រូរបស់យើង',
    'Start learning': 'ចាប់ផ្តើមរៀន',
    'Build your first website': 'បង្កើតគេហទំព័រដំបូងរបស់អ្នក',
    'Continue where you left off': 'បន្តពីកន្លែងដែលអ្នកឈប់',
    'Continue': 'បន្ត',
    'Course complete': 'បញ្ចប់វគ្គសិក្សាហើយ',
    'You finished {name}. Well done!': 'អ្នកបានបញ្ចប់ {name} ហើយ។ ល្អណាស់!',
    'Reset my progress': 'កំណត់ដំណើរការរៀនឡើងវិញ',
    'Clear your lesson progress on this device?': 'លុបដំណើរការរៀនរបស់អ្នកនៅលើឧបករណ៍នេះឬ?',

    // Courses and lessons
    'lesson {k} of {n}': 'មេរៀនទី {k} ក្នុងចំណោម {n}',
    'Lesson {k} of {n}': 'មេរៀនទី {k} ក្នុងចំណោម {n}',
    '{n} lesson': '{n} មេរៀន',
    '{n} lessons': '{n} មេរៀន',
    '{d} of {n} done': 'បានរៀន {d} ក្នុងចំណោម {n}',
    '{d} of {n} lessons done': 'បានរៀនចប់ {d} ក្នុងចំណោម {n} មេរៀន',
    'Back to {name}': 'ត្រឡប់ទៅ {name} វិញ',
    'Back to lessons': 'ត្រឡប់ទៅមេរៀនវិញ',
    'Follow the lessons in order.': 'សូមរៀនតាមលំដាប់លំដោយនៃមេរៀន។',
    'No lessons here yet.': 'មិនទាន់មានមេរៀននៅទីនេះទេ។',
    'Previous lesson': 'មេរៀនមុន',
    'Next lesson': 'មេរៀនបន្ទាប់',
    'Finished this lesson?': 'រៀនមេរៀននេះចប់ហើយឬ?',
    'Mark as done': 'សម្គាល់ថារៀនចប់',
    '\u2713 Done': '\u2713 រៀនចប់ហើយ',
    'See all lessons by {name}': 'មើលមេរៀនទាំងអស់ដោយ {name}',
    'Lessons by {name}': 'មេរៀនដោយ {name}',
    'Practice': 'ហាត់ធ្វើលំហាត់',
    'Practice: {n} exercises': 'លំហាត់៖ {n} សំណួរ',
    'Test yourself and check your answers.': 'សាកល្បងខ្លួនឯង ហើយពិនិត្យចម្លើយរបស់អ្នក។',

    // Helpful buttons
    'Was this lesson helpful?': 'តើមេរៀននេះមានប្រយោជន៍ដែរឬទេ?',
    'Yes': 'មាន',
    'Not really': 'មិនសូវមាន',
    'Thank you! We are glad it helped.': 'អរគុណ! យើងរីករាយដែលវាបានជួយអ្នក។',
    'Thank you for telling us.': 'អរគុណដែលបានប្រាប់យើង។',
    'Tell us what was confusing': 'ប្រាប់យើងថាផ្នែកណាដែលពិបាកយល់',

    // Search
    'Find a lesson by its title, its topic or any word inside it.': 'ស្វែងរកមេរៀនតាមចំណងជើង ប្រធានបទ ឬពាក្យណាមួយនៅក្នុងមេរៀន។',
    'Try: flexbox, loops, API, JSON': 'សាកល្បង៖ flexbox, loops, API, JSON',
    'Search lessons': 'ស្វែងរកមេរៀន',
    '{n} lessons found': 'រកឃើញ {n} មេរៀន',
    '{n} lesson found': 'រកឃើញ {n} មេរៀន',
    'searching inside lessons\u2026': 'កំពុងស្វែងរកក្នុងខ្លឹមសារមេរៀន\u2026',
    'No lessons found. Try a shorter or different word.': 'រកមិនឃើញមេរៀនទេ។ សូមសាកល្បងពាក្យខ្លីជាងនេះ ឬពាក្យផ្សេង។',

    // Contact form
    'Contact us': 'ទាក់ទងមកយើង',
    'Send us a message and we will reply to your email.': 'ផ្ញើសារមកយើង ហើយយើងនឹងឆ្លើយតបទៅអ៊ីមែលរបស់អ្នក។',
    'Your name': 'ឈ្មោះរបស់អ្នក',
    'Your email': 'អ៊ីមែលរបស់អ្នក',
    'Message': 'សារ',
    'Please do not include links. Your email is only used to reply to you.': 'សូមកុំដាក់តំណភ្ជាប់ (link) ក្នុងសារ។ អ៊ីមែលរបស់អ្នកប្រើសម្រាប់តែឆ្លើយតបមកអ្នកប៉ុណ្ណោះ។',
    'Send message': 'ផ្ញើសារ',
    'Sending\u2026': 'កំពុងផ្ញើ\u2026',
    'Please enter your name, a valid email and a message of at least 10 characters.': 'សូមបញ្ចូលឈ្មោះ អ៊ីមែលត្រឹមត្រូវ និងសារយ៉ាងតិច ១០ តួអក្សរ។',
    'Links are not allowed in the message. Please remove them and try again.': 'មិនអនុញ្ញាតឱ្យដាក់តំណភ្ជាប់ក្នុងសារទេ។ សូមលុបចេញ ហើយសាកល្បងម្តងទៀត។',
    'Thank you! Your message was sent. We will reply to your email.': 'អរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើហើយ។ យើងនឹងឆ្លើយតបទៅអ៊ីមែលរបស់អ្នក។',
    'Could not send. Please try again.': 'ផ្ញើមិនបានទេ។ សូមសាកល្បងម្តងទៀត។'
  };

  let lang = 'en';
  try {
    const s = localStorage.getItem('chhoyed-lang');
    lang = s === 'km' || s === 'en' ? s : ((navigator.language || '').toLowerCase().startsWith('km') ? 'km' : 'en');
  } catch { }

  const tr = (en, vars) => {
    let s = (lang === 'km' && KM[en]) || en;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
    return s;
  };
  const set = l => { lang = l === 'km' ? 'km' : 'en'; try { localStorage.setItem('chhoyed-lang', lang); } catch { } };

  window.I18N = { tr, set, get lang() { return lang; } };
})();

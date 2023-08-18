// function getFullName(firstname: string, surname: string): string {
//   return `${firstname} ${surname}`
// }
//
// const getFullNameArrow = (firstname: string, surname: string): string => {
//   return `${firstname} ${surname}`
// }
//
// enum StatusCode {
//   SUCCESS = 2,
//   IN_PROGRESS = 's',
//   FAILED = 'a'
// }
//
// function action(status: StatusCode) {
//
// }
//
// action(4)
// action(StatusCode.IN_PROGRESS)


enum Status {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  DELETED = 'deleted',
}

interface MyResponse {
  status: Status;
	question: string;
  answer: string;
  tags: string[];
  likes: number;
}

async function getFaqs(req: { topicId: number; status: Status }): Promise<MyResponse[]> {
  const res = await fetch('/faqs', {
    method: 'POST',
    body: JSON.stringify(req)
  });
  const data = await res.json();
  return data;
}

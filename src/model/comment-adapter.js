export class CommentAdapter {
    constructor(data) { 
      this.id = data.id;
      this.author = data.author;
      this.text = data.comment;
      this.date = data.date;
      this.emoji = data.emotion;
    }
  
    static toRAW(data) {
      return {
        'id': data.id,
        'author': data.author,
        'comment': data.text,
        'date': data.date,
        'emotion': data.emoji,
      };
    }
    
    static parseComment(data) {
      return new CommentAdapter(data);
    }
    
    static parseComments(data) {
      return data.map(CommentAdapter.parseComment);
    }
  }
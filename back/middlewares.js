const isPublic = (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      next();
    } else {
      res.status(401).send('로그인한 사용자는 접근 할 수 없습니다');
    }
  } catch (error) {
    next(error);
  }
};

const isPrivate = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).send('로그인이 필요합니다.');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { isPublic, isPrivate };

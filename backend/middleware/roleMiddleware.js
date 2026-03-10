export const authorize = (...roles) => {
  // console.log(roles, 'roles in authorize middleware');
  
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

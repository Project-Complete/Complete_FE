import { MotionStyle, motion } from 'framer-motion';

type PourAnimationPropsType = {
  children: React.ReactNode;
  isSelectComplete: boolean;
  animate?: number | number[];
  times?: number[];
  style?: MotionStyle;
};

const PourAnimation = ({
  children,
  isSelectComplete,
  animate = 40,
  times,
  style,
}: PourAnimationPropsType) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{
        y: isSelectComplete ? 0 : animate,
        opacity: isSelectComplete ? 1 : 0,
      }}
      transition={{ duration: 1, times: times }}
      style={style}
    >
      {children}
    </motion.div>
  );
};
export default PourAnimation;

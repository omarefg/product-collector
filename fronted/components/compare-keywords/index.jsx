import { useContext, useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Router, { useRouter } from 'next/router';

import { TrendContext } from '../../context/trend-context';
import Keyword from './keyword';
import AddKeyword from './add-keyword';

import styles from './CompareKeywords.module.styl';

export default function CompareKeywords() {
  const router = useRouter();
  const { keywords, setKeywords } = useContext(TrendContext);
  const { register, triggerValidation, getValues, setValue } = useForm();

  const MAX_KEYWORDS = 5;
  const buttonRef = useRef();

  const [errors, setErrors] = useState(
    Array.from(Array(MAX_KEYWORDS), (item) => ' ')
  );

  useEffect(() => {
    keywords.map((keyword, index) => setValue(index.toString(), keyword));
  });

  const updateKeywordsAndErrors = async (name) => {
    const values = Object.values(getValues());
    setKeywords(values);
    const result = await triggerValidation(name);
    const newErrors = errors.slice();
    if (!result) {
      newErrors[Number(name)] = '* Valor requerido';
    } else {
      newErrors[Number(name)] = ' ';
      buttonRef.current && buttonRef.current.focus();
    }
    setErrors(newErrors);

    const valuesString = values.join(',');
    Router.push({
      pathname: router.pathname,
      query: { search: valuesString },
    });
  };

  const handleBlur = async () => {
    const {
      target: { name },
    } = event;
    await updateKeywordsAndErrors(name);
  };

  const handleKeyPress = async () => {
    const {
      key,
      target: { name },
    } = event;
    if (key === 'Enter') {
      await updateKeywordsAndErrors(name);
    }
  };

  const handleRemoveClick = (name) => {
    const newKeywords = keywords.filter(
      (item) => keywords.indexOf(item) !== Number(name)
    );
    setKeywords(newKeywords);
  };

  const handleAddClick = () => {
    setKeywords(keywords.concat(''));
  };

  return (
    <section className={styles.compare}>
      {keywords.map(
        (keyword, index) =>
          index < MAX_KEYWORDS && (
            <Keyword
              key={`search-${index}`}
              name={`${index}`}
              keyword={keyword}
              color={index.toString()}
              inputRef={register({
                required: true,
              })}
              handleKeyPress={handleKeyPress}
              handleBlur={handleBlur}
              helperText={errors && errors[index]}
              handleRemoveClick={handleRemoveClick}
            />
          )
      )}
      {keywords.length < MAX_KEYWORDS && (
        <AddKeyword buttonRef={buttonRef} handleOnClick={handleAddClick} />
      )}
    </section>
  );
}

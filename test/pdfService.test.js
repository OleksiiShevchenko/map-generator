'use strict';


const mocha = require('mocha');
const chai = require('chai');
const assert = chai.assert;

const pdf = require('../src/services/pdfService/pdf.service');


const samplePdfInput = {
  imgSrc: 'https://maps.googleapis.com/maps/api/staticmap?size=640x640&scale=2&language=en&path=weight:5%7Ccolor:0x4a80f5BB%7Cenc%3AqoqaGn~tpLcKKN%60PdW%5CdQe%5Dp%5EyHpWvm%40%7CZrM_DbbAJjlCwRjgBmh%40liAnF%60m%40yJ~%7BAnEf%7CElj%40zeE%7CYp%7BElj%40viBhCbrBlRr%7CBzGpsAp%7C%40xzBt%5Cjj%40nLhw%40%60%5DxgAhF~p%40cJfjAcRfwCvg%40piDzi%40hxAhO%7CiCvn%40xlAvj%40znAv_AjuFfkAb~E%7CeA%60hAb%7DAzrBfw%40pnCiB%7CtBl%40zqHfZfdCtExjEd_%40dyBrk%40duAvUrtArTldDfSnfB%7Ch%40prAxOzcBnr%40roD%60l%40nxCdh%40jaB%7Cx%40daC%60Xfr%40nIvfAbRjcCvt%40%60_Dv%7C%40lxDb%40%7C_%40%7CWrf%40vbAn_Ali%40fk%40vsAx%5C%7ClCpcB%7C%7BFv_El%60BfzBdeDrpBlkDj%7DBrvArfAdtCxkI%7CrBhgBzSpd%40jn%40jgA%60tCfbIv%60BpnEdO%7C%60BiK%7C~%40xH%7CwAPzxAtbBpyCfs%40voBbl%40vrDfy%40nvAt_%40zvAtc%40peC%7Cw%40bz%40f~AdcAvWfl%40%60C%60y%40~%60%40htDdb%40npBhe%40%7CtAxr%40h_Ad%7C%40f%5Bbb%40sFlq%40saAxc%40qNjuAoa%40ff%40%7DA%7Cb%40~P%60z%40h_%40vaAv%7B%40biBp~%40tn%40%7CGh%5CbWnpA%60lAboB%7Cy%40t%60Bl%7B%40~%60AtT%60wAlcAzcApbBn%7DA%7C~%40zaA%60hBtXfV~q%40jJnk%40vb%40dv%40zcAh%7C%40lqAfwA%60rBn%7BCdjBlcDh%7BAndB%60%5ChrA%60s%40%60mAl_Bbb%40f%7DAfy%40fvAhu%40laAdC%7Ci%40j%5D~x%40nd%40npBbLbm%40lbA%7ClAjnCntDxi%40x%7DCzX%60%5Cn%60Bp%5CfnAnbAhdDzxCbd%40zgA%7CG%7CeBho%40hhEe%40hgBvd%40bn%40~%5Bxc%40tYvrAx%5CvYnb%40vRvXt%5E%60i%40zRle%40dM~j%40qKniA%7CLt%5EcMj%5CjoAuHhjBbLvz%40dYds%40ljAvq%40ro%40nhDdIhx%40jc%40vo%40bp%40p%7B%40p%5Ej%60BuDffEhQboDvv%40vdC%7CYdnBpF~t%40ba%40pjAxu%40%7CcAnTto%40%7C%60Atk%40la%40p%7BAtQh%7D%40nA%7Cp%40rEhh%40ra%40vb%40dYhWdMbo%40dWrbAh%5EjwAbGlgBbU~sAff%40rtBbl%40%60l%40pv%40twD%60kAf%60Bbx%40lr%40vq%40lu%40pJlbAvJbx%40b%60AhjBn%40pjBvLd_%40~a%40pPvi%40%60oA%7C_Abk%40npAlw%40jw%40hpApmAxsA~c%40fU~Sf_%40vrBpeApOvxBph%40bhAv%5B%7CEnb%40kLvv%40k%60%40xd%40kDnnBwFnf%40xeAtMhkBb%5BlrEp%7DAhtBn_%40%60%60ArYz%5C%7BVhx%40jLmGxYhCf%7B%40p%7D%40%60TpXlZsGr%5BdIxR~TtjAteAf_BdqA~c%40pNl_%40gFv%5CaJhm%40bQvn%40zVhF~s%40r%5E~jBxSxa%40h%40b_%40%7DZvDcd%40qKaDi%40&path=weight:5%7Ccolor:0x989898AA%7Cenc%3AqoqaGn~tpLcKKN%60PdW%5CdQe%5Dp%5EyHpWvm%40%7CZrM_DbbAJjlCwRjgBmh%40liAiC%60jCnEf%7CElj%40zeE%7CYp%7BElj%40viBvVvoFzGpsAp%7C%40xzBfhAnkDyBf%7CBcRfwCvg%40piDzi%40hxAhO%7CiCvn%40xlAvj%40znAv_AjuFfkAb~E%7CeA%60hAb%7DAzrBfw%40pnCiB%7CtBl%40zqHfZfdCtExjEd_%40dyBrk%40duAvUrtArTldDfSnfB%7Ch%40prAhcAntGfuAzzF%7Cx%40daCpb%40~yBbRjcCvt%40%60_Dz%7D%40jyEt%7BAbgBli%40fk%40vsAx%5C%7ClCpcB%7C%7BFv_El%60BfzBdeDrpBlkDj%7DBrvArfAdtCxkI%7CrBhgBzSpd%40jn%40jgA%60tCfbIv%60BpnEdO%7C%60BiK%7C~%40jIxqDtbBpyCfs%40voBbl%40vrDfy%40nvAjdAl%7DE%7Cw%40bz%40f~AdcAvWfl%40%60C%60y%40j%7C%40zcIac%40h%7DBiJlxBvx%40hiBfY%60T%7Cj%40jWzAjfCrRbx%40x%5CDba%40x%5DzV%7CiArc%40tl%40lEn%7DBne%40z~AveC~lA~tDxjBHtxBlcAlf%40xjDpzCly%40r%7CAjnAf%60AvtA%7CNlr%40uXvVaA%60xAraAbq%40vh%40j%60ArwBvq%40lbAjLd~%40nT%60l%40c%5DvnAiNtq%40jXtoAzCzy%40gDz%7C%40sX~q%40cf%40fViIprBvV%7C_Cfm%40%7CnAtr%40hm%40~r%40xKjOr%5Eva%40j%7CB~c%40vzB%7CnBveEjwAphG%7Cx%40x%60Axs%40%60lA%7Ck%40xjAdUvZzc%40zDry%40%7BN~kA%7CjAtk%40j~%40iLvgBml%40d~As%5ErfBbLlxAnGr%7CBjMdzAoH%7Cr%40nX%60uApi%40vqC%7BZ%60fA~%5CzpBd%5C~xA~i%40hu%40h%5DbdA~n%40AjUdCxMbj%40si%40bxEoMxu%40pM~%60Azg%40tuEDr%7D%40e%5EzgA_ThOhFnZ%7Ck%40%40vn%40~YjZ~~%40hx%40%60bBjt%40~%60Ad~%40%60iAd%60%40rNbdA%7CJlYaApYfXroAvjAty%40bPjfAvJ~iAla%40ty%40Ubt%40wg%40%7Cw%40g%5DrqAde%40~xApi%40txA_EjeBfQ%7CiAsPrxAbXxvAb%60%40peA~m%40bkApM~rD~rAjvC%60Dbw%40fk%40v%5C~Q%60m%40sFbdBuZx%60%40tH~f%40al%40fRyJxx%40%7CTt%7B%40~i%40jr%40%60r%40vh%40rb%40zNvg%40nb%40fl%40hQvfAz%5Cxy%40z%7B%40zaCl%60%40lXrg%40%7DAzdAbw%40dRqKxLcQxQzG~YzYzw%40lVrlA~OhbAxC%7C%7DArO%7Cf%40zGdv%40lr%40_DnKrW_TvpAeEj~%40%7D%40z%5Bln%40dIn%7D%40f%5Ex~EdOraAvj%40fl%40laAfwBt_%40fUeB~VsOlo%40jV_Kfp%40vp%40~q%40vj%40x_%40yInUzM%7C%7D%40hz%40jcBd%7DAlaAza%40~_AuN%60yA~j%40pPdyBli%40foAwDjWo%5BIed%40wJ&markers=size:mid%7Ccolor:red%7C285%20Fulton%20St%2C%20New%20York%2C%20NY%2010007%2C%20USA&key=AIzaSyCgmYT7nWxLoPzwfsvsMuMRZ9i4cqCH9IA',
  props: {
    id: '02113',
    routes: [
      {
        distance: '216 mi',
        duration: '3 hours 39 mins',
        summary: 'I-90 W',
        polyline: 'qoqaGn~tpLcKKN`PdW\\dQe]p^yHpWvm@|ZrM_DbbAJjlCwRjgBmh@liAnF`m@yJ~{AnEf|Elj@zeE|Yp{Elj@viBhCbrBlRr|BzGpsAp|@xzBt\\jj@nLhw@`]xgAhF~p@cJfjAcRfwCvg@piDzi@hxAhO|iCvn@xlAvj@znAv_AjuFfkAb~E|eA`hAb}AzrBfw@pnCiB|tBl@zqHfZfdCtExjEd_@dyBrk@duAvUrtArTldDfSnfB|h@prAxOzcBnr@roD`l@nxCdh@jaB|x@daC`Xfr@nIvfAbRjcCvt@`_Dv|@lxDb@|_@|Wrf@vbAn_Ali@fk@vsAx\\|lCpcB|{Fv_El`BfzBdeDrpBlkDj}BrvArfAdtCxkI|rBhgBzSpd@jn@jgA`tCfbIv`BpnEdO|`BiK|~@xH|wAPzxAtbBpyCfs@voBbl@vrDfy@nvAt_@zvAtc@peC|w@bz@f~AdcAvWfl@`C`y@~`@htDdb@npBhe@|tAxr@h_Ad|@f[bb@sFlq@saAxc@qNjuAoa@ff@}A|b@~P`z@h_@vaAv{@biBp~@tn@|Gh\\bWnpA`lAboB|y@t`Bl{@~`AtT`wAlcAzcApbBn}A|~@zaA`hBtXfV~q@jJnk@vb@dv@zcAh|@lqAfwA`rBn{CdjBlcDh{AndB`\\hrA`s@`mAl_Bbb@f}Afy@fvAhu@laAdC|i@j]~x@nd@npBbLbm@lbA|lAjnCntDxi@x}CzX`\\n`Bp\\fnAnbAhdDzxCbd@zgA|G|eBho@hhEe@hgBvd@bn@~[xc@tYvrAx\\vYnb@vRvXt^`i@zRle@dM~j@qKniA|Lt^cMj\\joAuHhjBbLvz@dYds@ljAvq@ro@nhDdIhx@jc@vo@bp@p{@p^j`BuDffEhQboDvv@vdC|YdnBpF~t@ba@pjAxu@|cAnTto@|`Atk@la@p{AtQh}@nA|p@rEhh@ra@vb@dYhWdMbo@dWrbAh^jwAbGlgBbU~sAff@rtBbl@`l@pv@twD`kAf`Bbx@lr@vq@lu@pJlbAvJbx@b`AhjBn@pjBvLd_@~a@pPvi@`oA|_Abk@npAlw@jw@hpApmAxsA~c@fU~Sf_@vrBpeApOvxBph@bhAv[|Enb@kLvv@k`@xd@kDnnBwFnf@xeAtMhkBb[lrEp}AhtBn_@``ArYz\\{Vhx@jLmGxYhCf{@p}@`TpXlZsGr[dIxR~TtjAteAf_BdqA~c@pNl_@gFv\\aJhm@bQvn@zVhF~s@r^~jBxSxa@h@b_@}ZvDcd@qKaDi@'
      },
      {
        distance: '228 mi',
        duration: '3 hours 51 mins',
        summary: 'I-84',
        polyline: 'qoqaGn~tpLcKKN`PdW\\dQe]p^yHpWvm@|ZrM_DbbAJjlCwRjgBmh@liAiC`jCnEf|Elj@zeE|Yp{Elj@viBvVvoFzGpsAp|@xzBfhAnkDyBf|BcRfwCvg@piDzi@hxAhO|iCvn@xlAvj@znAv_AjuFfkAb~E|eA`hAb}AzrBfw@pnCiB|tBl@zqHfZfdCtExjEd_@dyBrk@duAvUrtArTldDfSnfB|h@prAhcAntGfuAzzF|x@daCpb@~yBbRjcCvt@`_Dz}@jyEt{AbgBli@fk@vsAx\\|lCpcB|{Fv_El`BfzBdeDrpBlkDj}BrvArfAdtCxkI|rBhgBzSpd@jn@jgA`tCfbIv`BpnEdO|`BiK|~@jIxqDtbBpyCfs@voBbl@vrDfy@nvAjdAl}E|w@bz@f~AdcAvWfl@`C`y@j|@zcIac@h}BiJlxBvx@hiBfY`T|j@jWzAjfCrRbx@x\\Dba@x]zV|iArc@tl@lEn}Bne@z~AveC~lA~tDxjBHtxBlcAlf@xjDpzCly@r|AjnAf`AvtA|Nlr@uXvVaA`xAraAbq@vh@j`ArwBvq@lbAjLd~@nT`l@c]vnAiNtq@jXtoAzCzy@gDz|@sX~q@cf@fViIprBvV|_Cfm@|nAtr@hm@~r@xKjOr^va@j|B~c@vzB|nBveEjwAphG|x@x`Axs@`lA|k@xjAdUvZzc@zDry@{N~kA|jAtk@j~@iLvgBml@d~As^rfBbLlxAnGr|BjMdzAoH|r@nX`uApi@vqC{Z`fA~\\zpBd\\~xA~i@hu@h]bdA~n@AjUdCxMbj@si@bxEoMxu@pM~`Azg@tuEDr}@e^zgA_ThOhFnZ|k@@vn@~YjZ~~@hx@`bBjt@~`Ad~@`iAd`@rNbdA|JlYaApYfXroAvjAty@bPjfAvJ~iAla@ty@Ubt@wg@|w@g]rqAde@~xApi@txA_EjeBfQ|iAsPrxAbXxvAb`@peA~m@bkApM~rD~rAjvC`Dbw@fk@v\\~Q`m@sFbdBuZx`@tH~f@al@fRyJxx@|Tt{@~i@jr@`r@vh@rb@zNvg@nb@fl@hQvfAz\\xy@z{@zaCl`@lXrg@}AzdAbw@dRqKxLcQxQzG~YzYzw@lVrlA~OhbAxC|}ArO|f@zGdv@lr@_DnKrW_TvpAeEj~@}@z[ln@dIn}@f^x~EdOraAvj@fl@laAfwBt_@fUeB~VsOlo@jV_Kfp@vp@~q@vj@x_@yInUzM|}@hz@jcBd}AlaAza@~_AuN`yA~j@pPdyBli@foAwDjWo[Ied@wJ'
      }
    ],
    startAddress: 'Boston, MA 02113, USA',
    endAddress: '285 Fulton St, New York, NY 10007, USA'
  }
};


describe('PDF Service Test Suite', function () {

  it('it should generate pdf file and write it into outputData dir', function () {
    this.timeout(10000);

    return pdf.generateDocument(samplePdfInput)
     .then(data => {
       assert.exists(data, 'data is neither `null` nor `undefined`');
       assert.typeOf(data, 'object', 'data is an object');
       assert.containsAllKeys(data, ['pdf'], 'response structure is right');
     });
  });

});

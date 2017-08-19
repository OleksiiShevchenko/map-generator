'use strict';

const sinonChai = require('sinon-chai');
const mocha = require('mocha');
const chai = require('chai');
const assert = chai.assert;

chai.use(sinonChai);

const gMapsService = require('../src/services/googleMaps/maps.service');

const sampleResponse = require('./sampleDirectionsResponse');
const testData = {
  zipCode: '02113',
  id: '02113'
};
const sampleImgData = {
  id: '02113',
  routes: [{
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
    }],
  startAddress: 'Boston, MA 02113, USA',
  endAddress: '285 Fulton St, New York, NY 10007, USA'
};


describe('Google Maps API Service Test Suite', function () {

  it('it should get valid response from Google Directions API', function () {

    return gMapsService.getDirections(testData)
      .then(data => {
        assert.exists(data, 'data is neither `null` nor `undefined`');
        assert.typeOf(data, 'object', 'response is an object');
        //assert.containsAllKeys(data, ['status', 'headers', 'json', 'requestUrl', 'query'], 'response structure is right');
      });
  });

  it('it should get apply appropriate formatting to the response data', function () {

    return gMapsService.formatDirectionsResponse({directions: sampleResponse, params: testData})
      .then(data => {
        assert.exists(data, 'data is neither `null` nor `undefined`');
        assert.typeOf(data, 'object', 'response is an object');
        assert.containsAllKeys(data, ['id', 'routes', 'startAddress', 'endAddress'], 'response structure is right');
      });
  });

  it('it should return map image url and metadata for pdf generation', function () {

    return gMapsService.fetchStaticImage(sampleImgData)
     .then(data => {
       assert.exists(data, 'data is neither `null` nor `undefined`');
       assert.typeOf(data, 'object', 'response is an object');
       assert.containsAllKeys(data, ['imgSrc', 'props']);
     });
  });

});
